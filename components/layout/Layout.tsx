import Footer from '@/components/layout/Footer';
import Head from '@/components/core/Head';
import NextHead from 'next/head';
import {FunctionComponent, ReactComponentElement, ReactNode} from 'react';
import {NextRouter, useRouter} from 'next/router';
import Socials from '@/components/parts/Socials';

interface Props {
	readonly children: ReactNode;
}


const Layout: FunctionComponent<Props> = ({ children }): ReactComponentElement<'div'> => {
	const router: NextRouter = useRouter();


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
				<div className="page__wrap">
					<div className="page__content">{children}</div>
					<Socials/>
					<Footer />
				</div>
		</div>
	);
};

export default Layout;
