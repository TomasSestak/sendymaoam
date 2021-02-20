import {useForm} from 'react-hook-form';
import Button from '@/components/core/Button';
import Input from '@/components/core/Input';
import {ComponentType, Dispatch, FunctionComponent, ReactComponentElement, SetStateAction, useState} from 'react';
import NextImage from 'next/image';
import Typo from '@/components/core/Typo';
import Overlay from '@/components/modal/Overlay';
import VerticalSlider from '@/components/parts/VerticalSlider';
import {Album} from '@/pages';

interface Props extends Album {
	index: number,
	setModal: () => void
}

const MasonryCard: FunctionComponent<Props> = ({index, description, mainPhoto, otherPhotos, setModal}): ReactComponentElement<'div'> => {

	return (
			<div className="masonry-card" onClick={setModal} tabIndex={index}>
					<img src={mainPhoto.url} className="masonry-card__image"/>
					<div className="masonry-card__footer">
						<Typo variant={'h1'} color={'white'}>
							{description}
						</Typo>
					</div>
			</div>
	);
};

export default MasonryCard;
