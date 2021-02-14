import {FunctionComponent, ReactElement} from 'react';
import {NextRouter, useRouter} from 'next/router';

const Index: FunctionComponent = (): ReactElement<'div'> => {

	const router: NextRouter = useRouter();


	return (
		<div className="index">

		</div>
	);
};

export default Index;
