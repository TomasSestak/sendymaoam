import { FunctionComponent, ReactElement } from 'react';
import { NextRouter, useRouter } from 'next/router';
import useSWR, { keyInterface } from 'swr';
import { request } from 'graphql-request';
import { Masonry } from 'masonic';
import MasonryCard from '@/components/parts/MasonryCard';
import dynamic from 'next/dynamic';

const getAlbums: keyInterface = `query getAlbums {
	albums {
	id
	description
	mainPhoto {
		url
	}
	otherPhotos {
		id
		url
	}}
}`;

export interface Album {
	id: number;
	description: string;
	mainPhoto: {
		url: string;
	};
	otherPhotos: {
		id: number;
		url: string;
	}[];
}

const fetcher = (query) => request('https://api-eu-central-1.graphcms.com/v2/ckgvezkmyahep01wf4ixt373c/master', query);

export const getStaticProps = async (context) => {
	const initialData: { albums: Album[] } = await fetcher(getAlbums);

	return {
		props: {
			initialData,
		},
	};
};

interface Props {
	initialData: {
		albums: Album[];
	};
}

const DynamicMasonry: any = dynamic((): any => import('masonic').then((module) => module.Masonry), {
	ssr: false,
});

const Index: FunctionComponent<Props> = ({ initialData }): ReactElement<'div'> => {
	const {
		data: { albums },
		error,
	} = useSWR<{ albums: Album[] }>(getAlbums, fetcher, { initialData });

	const router: NextRouter = useRouter();

	return (
		<div className="index">
			<DynamicMasonry items={albums} render={MasonryCard} columnWidth={500} tabIndex={null}/>
		</div>
	);
};

export default Index;
