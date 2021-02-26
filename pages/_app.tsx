import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import '@/scss/main.scss';

import TagManager from 'react-gtm-module';
import Layout from '@/components/layout/Layout';
import {FunctionComponent, ReactComponentElement, useEffect} from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr'

const tagManagerArgs = {
	gtmId: 'GTM-5XZ62MN',
};

const App: FunctionComponent<AppProps> = ({Component, pageProps}): ReactComponentElement<typeof Layout> => {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);
	return (
		<SWRConfig value={{refreshInterval: 60000}}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	);
};

export default App;
