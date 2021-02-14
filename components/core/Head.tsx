import NextHead from 'next/head';
import {NextRouter, useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {Translate} from 'next-translate';
import {FunctionComponent, ReactComponentElement} from 'react';

const Head: FunctionComponent = (): ReactComponentElement<typeof NextHead> => {
	const router: NextRouter = useRouter();

	const { t }: { t: Translate } = useTranslation('meta');

	return (
		<NextHead>
			<title>{t(`${router.pathname}.title`)}</title>
			<meta name="description" content={t(`${router.pathname}.description`)} />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="og:type" content="website" />
			<meta property="og:image" content="/images/og.png" />
			{typeof window !== 'undefined' && (
				<meta property="og:url" content={window?.location.protocol + '//' + window?.location.hostname} />
			)}
		</NextHead>
	);
};

export default Head;
