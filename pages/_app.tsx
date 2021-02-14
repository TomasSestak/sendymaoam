import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import '@/scss/main.scss';

import Layout from '@/components/layout/Layout';
import {FunctionComponent, ReactComponentElement} from 'react';
import {AppProps} from 'next/app';


const App: FunctionComponent<AppProps> = ({Component, pageProps}): ReactComponentElement<typeof Layout> => {
	return (
		<Layout>
			<Component
				{...pageProps}
			/>
		</Layout>
	);
};

export default App;
