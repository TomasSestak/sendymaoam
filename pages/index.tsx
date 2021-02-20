import {FunctionComponent, ReactElement, useEffect, useState} from 'react';
import {NextRouter, useRouter} from 'next/router';
import useSWR, {keyInterface} from 'swr';
import {request} from 'graphql-request';
import MasonryCard from '@/components/parts/MasonryCard';
import dynamic from 'next/dynamic';
import Overlay from '@/components/modal/Overlay';
import VerticalSlider from '@/components/parts/VerticalSlider';

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

const fetcher = (query): Promise<{ albums: Album[] }> => request('https://api-eu-central-1.graphcms.com/v2/ckgvezkmyahep01wf4ixt373c/master', query);

export const getStaticProps = async (context) => {
	const initialData: { albums: Album[] } = await fetcher(getAlbums);

	return {
		props: {
			initialData,
		},
		revalidate: 60
	};
};

interface Props {
	initialData: {
		albums: Album[];
	};
}


const Index: FunctionComponent<Props> = ({initialData}): ReactElement<'div'> => {
	const {
		data: {albums},
		error,
	} = useSWR<{ albums: Album[] }>(getAlbums, fetcher, {initialData});

	const router: NextRouter = useRouter();

	const [modal, setModal] = useState<false | number>(false);

	useEffect(() => {
		const Masonry = require('masonry-layout');
		const masonry = new Masonry('.grid', {
			percentPosition: true
		});
		window.addEventListener('load', () => {
			masonry.layout()
		})
	}, [])


	return (
		<div className="index">
			{modal !== false && (
				<Overlay hide={() => setModal(false)}>
					<VerticalSlider photos={albums[modal].otherPhotos}/>
				</Overlay>
			)}
			<div className="grid">
				{[...albums].reverse().map((data, key) => {
					return (
						<MasonryCard key={key} index={key} {...data} setModal={() => setModal(albums.length - 1 - key)}/>
					)
				})}
			</div>
		</div>
	);
};

export default Index;
