import '@/scss/main.scss';

import {Provider} from 'react-redux';
import {CombinedState, configureStore} from '@reduxjs/toolkit';
import combinedReducer from '@/store/index';
import {LayoutTree} from '@moxy/next-layout';
import Layout from '@/components/layout/Layout';
import {FunctionComponent, ReactComponentElement} from 'react';
import Router from 'next/router';
import {AppProps} from 'next/app';

const reducer = (state, action) => {
	if (action.type === 'authorization/logout') {
		state = undefined;
	}
	return combinedReducer(state, action);
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App: FunctionComponent<AppProps> = ({ Component, pageProps }): ReactComponentElement<typeof Provider> => {
	return (
		<Provider store={store}>
			<Layout>
				<LayoutTree
					Component={Component}
					pageProps={pageProps}
				/>
			</Layout>
		</Provider>
	);
};

export default App;
