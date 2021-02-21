import { useForm } from 'react-hook-form';
import Button from '@/components/core/Button';
import Input from '@/components/core/Input';
import {FunctionComponent, ReactComponentElement, useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Mousewheel } from 'swiper';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

SwiperCore.use([Pagination, Mousewheel]);

interface Props {
	photos: { id: number; url: string }[];
}

const VerticalSlider: FunctionComponent<Props> = ({ photos }): ReactComponentElement<'form'> => {

	const [active, setActive] = useState(false);

	useEffect(() => {

		return () => {
			console.log("DESTORY");
			setActive(false);
		}
	}, [])

	return (
		<div className="vertical-slider">
			<Swiper
				direction={'vertical'}
				slidesPerView={1}
				pagination={{ clickable: true }}
				mousewheel
				centeredSlides
				loop
				onAfterInit={() => {
					setActive(true)
				}}
			>
				{photos.map(({ id, url }) => {
					return (
						<SwiperSlide key={id} className={'vertical-slider__slide'}>
							<img src={url} className="vertical-slider__image" style={{opacity: active ? 1 : 0, maxHeight: '81vh', margin: '4.5vh auto', display: 'block'}}/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	)
};

export default VerticalSlider;
