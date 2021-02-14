import { useForm } from 'react-hook-form';
import Button from '@/components/core/Button';
import Input from '@/components/core/Input';
import { ComponentType, FunctionComponent, ReactComponentElement, useState } from 'react';
import NextImage from 'next/image';
import Typo from '@/components/core/Typo';
import Overlay from '@/components/modal/Overlay';
import VerticalSlider from '@/components/parts/VerticalSlider';
import { RenderComponentProps } from 'masonic';
import { Album } from '@/pages';

const MasonryCard: ComponentType<RenderComponentProps<Album>> = ({
	index,
	data: { description, mainPhoto, otherPhotos },
}): ReactComponentElement<'div'> => {
	const [modal, setModal] = useState<boolean>(false);

	return (
		<>
			{modal && (
				<Overlay hide={() => setModal(false)}>
					<VerticalSlider photos={otherPhotos} />
				</Overlay>
			)}
			<div className="masonry-card" onClick={() => setModal(true)} tabIndex={index}>
				<img src={mainPhoto.url} className="masonry-card__image" />
				<div className="masonry-card__footer">
					<Typo variant={'h1'} color={'white'}>
						{description}
					</Typo>
				</div>
			</div>
		</>
	);
};

export default MasonryCard;
