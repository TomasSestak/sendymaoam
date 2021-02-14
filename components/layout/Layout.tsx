import Footer from '@/components/layout/Footer';
import Head from '@/components/core/Head';
import NextHead from 'next/head';
import { FunctionComponent, ReactComponentElement, ReactNode, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/pages/_app';
import { setAuthorization, setLogout } from '@/store/authorization';
import MessageComponent from '@/components/modal/Message';
import { Message } from '@/store/modal';
import { NextRouter, useRouter } from 'next/router';
import { setSecurity } from '@/store/security';

const sharedConfig: AxiosRequestConfig = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'origin-url': typeof window !== 'undefined' ? location.origin : undefined,
	},
};

export const axiosInstance: AxiosInstance = axios.create({
	...sharedConfig,
});

export const cleanAxios: AxiosInstance = axios.create({
	...sharedConfig,
});

interface Props {
	readonly children: ReactNode;
}

export const SAFE_CONSTANT = 10;
export const TO_MS = 1000;

export const getSecurityApiKey: () => string | null = () => {
	return localStorage.getItem('flexihub@security_api_key');
};

const Layout: FunctionComponent<Props> = ({ children }): ReactComponentElement<'div'> => {
	const dispatch: AppDispatch = useDispatch();
	const router: NextRouter = useRouter();

	const { message }: { message: Message } = useSelector((state: RootState) => state.modal);

	const [initial, setInitial] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			await dispatch(setSecurity());

			cleanAxios.interceptors.request.use(async (config: AxiosRequestConfig) => {
				config.headers['X-Api-Key'] = getSecurityApiKey();

				return config;
			});

			if (!router.asPath.includes('/create-password')) {
				//this is here to check for refresh token - if the checks fails - redirect to Login
				await dispatch(setAuthorization());
			}

			axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
				const access_token: string = localStorage.getItem('flexihub@access_token');

				config.headers['X-Api-Key'] = getSecurityApiKey();

				if (access_token) {
					const now: number = Date.now();
					const created_at: number = parseInt(localStorage.getItem('flexihub@created_at'));
					const expires_in: number = parseInt(localStorage.getItem('flexihub@expires_in'));

					if (now - created_at > (expires_in - SAFE_CONSTANT) * TO_MS) {
						await dispatch(setAuthorization());
						config.headers['Authorization'] = localStorage.getItem('flexihub@access_token');
					} else {
						config.headers['Authorization'] = access_token;
					}
					config.headers['Accept'] = 'application/json';
					config.headers['Content-Type'] = 'application/json';
					config.withCredentials = true;
				}

				return config;
			});

			axiosInstance.interceptors.response.use(
				async (response: AxiosResponse) => {
					return response;
				},
				async (error: AxiosError) => {
					console.log(error);
					console.log(error.response);
					if (error.response.data.code === 401) {
						alert('Vaše relace vypršela nebo nemáte přístupová práva');
						await dispatch(setLogout());
					}
					return Promise.reject(error);
				}
			);

			setInitial(true);
		})();
	}, []);

	return (
		<div className="page">
			<NextHead>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</NextHead>
			<Head />
			{initial && (
				<div className="page__wrap">
					<div className="page__content">{children}</div>
					<Footer />
				</div>
			)}
			{message.show && <MessageComponent text={message.text} type={message.type} />}
		</div>
	);
};

export default Layout;
