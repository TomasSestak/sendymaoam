import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import '@/scss/main.scss';

import Layout from '@/components/layout/Layout';
import {FunctionComponent, ReactComponentElement} from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr'

const App: FunctionComponent<AppProps> = ({Component, pageProps}): ReactComponentElement<typeof Layout> => {
	return (
		<SWRConfig value={{refreshInterval: 60000}}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	);
};

export default App;
