import {FunctionComponent, ReactNode} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import FocusTrap from 'focus-trap-react';
import Portal from '@/components/core/Portal';

interface Props {
	children: ReactNode
}

const Overlay: FunctionComponent<Props> = ({children}) => {

	return (
		<Portal id={'__next'}>
			<div className="overlay">
				<div className="overlay__inner">
					<FocusTrap>
						{children}
					</FocusTrap>
				</div>
			</div>
		</Portal>
	)
}

export default Overlay;
