import {FunctionComponent, ReactNode, useEffect} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import Portal from '@/components/core/Portal';

interface Props {
	children: ReactNode;
	hide: () => void;
}

const Overlay: FunctionComponent<Props> = ({children, hide}) => {

	useEffect(() => {
		const handleClick = ({target}) => (target as HTMLElement).classList.contains('overlay') && hide();
		const handleEscape = ({keyCode}) => keyCode === 27 && hide();

		document.addEventListener('click', handleClick);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('click', handleClick)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<Portal id={'__next'}>
			<div className="overlay">
				<div className="overlay__inner">
					{children}
				</div>
			</div>
		</Portal>
	)
}

export default Overlay;
