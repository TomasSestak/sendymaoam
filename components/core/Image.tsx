import NextImage from 'next/image';
import {FunctionComponent, ReactComponentElement} from 'react';

type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive';
type ImgElementStyle = NonNullable<JSX.IntrinsicElements['img']['style']>;
type Props = {
	readonly src: string;
	readonly quality?: number;
	readonly className?: string;
	readonly objectFit?: ImgElementStyle['objectFit'];
	readonly objectPosition?: ImgElementStyle['objectPosition'];
	readonly instantLoad?: boolean;
} & ({
	readonly width?: never;
	readonly height?: never;
	readonly layout: 'fill';
} | {
	readonly width: number | string;
	readonly height: number | string;
	readonly layout?: Exclude<LayoutValue, 'fill'>;
});

/*TODO: THIS COMPONENT IS NOT READY TO USE - WAITING FOR NEW LAYOUT MODES OF layout prop*/

const Image: FunctionComponent<Props> = ({
											 src,
											 quality,
											 className,
											 objectFit,
											 objectPosition,
											 instantLoad,
											 layout,
											 width,
											 height,
										 }): ReactComponentElement<typeof NextImage> => {
	return (
		<NextImage
			src={src}
			quality={quality || 95}
			className={className}
			priority={instantLoad}
			objectFit={objectFit}
			objectPosition={objectPosition}
			loading={instantLoad ? 'eager' : 'lazy'}
			width={width}
			height={height}
		/>
	);
};

export default Image;
