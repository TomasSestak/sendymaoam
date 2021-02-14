import { ReactSVG } from 'react-svg';
import { FunctionComponent, ReactComponentElement } from 'react';

// https://github.com/tanem/react-svg

interface Props {
	readonly name: string;
	readonly className?: string;
	readonly onClick?: () => void;
}

const Icon: FunctionComponent<Props> = ({ name, className, onClick }): ReactComponentElement<typeof ReactSVG> => (
	<ReactSVG
		src={`/icons/${name}.svg`}
		className={`${className ? className : ''} icon icon--${name} ${onClick ? 'icon--pointer' : ''}`}
		onClick={onClick}
	/>
);

export default Icon;
