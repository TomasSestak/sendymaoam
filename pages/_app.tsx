import '@/scss/main.scss';

import {LayoutTree} from '@moxy/next-layout';
import Layout from '@/components/layout/Layout';
import {FunctionComponent, ReactComponentElement} from 'react';
import {AppProps} from 'next/app';


const App: FunctionComponent<AppProps> = ({ Component, pageProps }): ReactComponentElement<typeof Provider> => {
	return (
			<Layout>
				<LayoutTree
					Component={Component}
					pageProps={pageProps}
				/>
			</Layout>
	);
};

export default App;
