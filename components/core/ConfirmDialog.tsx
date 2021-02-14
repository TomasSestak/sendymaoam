import { ReactSVG } from 'react-svg';
import { FunctionComponent, ReactComponentElement, useEffect } from 'react';
import Typo from '@/components/core/Typo';
import Button from '@/components/core/Button';
import Icon from '@/components/core/Icon';
import Overlay from '@/components/modal/Overlay';


interface Props {
	readonly hide: () => void;
	readonly onConfirm: (value?: number) => void;
	readonly message: string;
	readonly secondaryMessage?: string;
}

const ConfirmDialog: FunctionComponent<Props> = ({
	hide,
	onConfirm,
	message,
	secondaryMessage,
}): ReactComponentElement<'div'> => {
	useEffect(() => {
		const hideHandler = ({ keyCode }) => keyCode === 27 && hide();
		document.addEventListener('keydown', hideHandler);

		return () => {
			document.removeEventListener('keydown', hideHandler);
		};
	}, []);

	return (
		<Overlay>
			<div className="confirm-dialog">
				<div className="confirm-dialog__header">
					<Icon name={'close'} onClick={hide} />
				</div>
				<Typo variant={'h1'} color={'primary-dark-blue'} className={'confirm-dialog__message'}>
					{message}
				</Typo>
				{secondaryMessage && (
					<Typo
						variant={'lg'}
						color={'primary-dark-blue'}
						className={'confirm-dialog__secondary-message'}
						html={secondaryMessage}
					/>
				)}
				<div className="confirm-dialog__cta">
					<Button type={'button'} variant={'terciary'} onClick={onConfirm} icon={false}>
						Potvrdit
					</Button>
					<Button type={'button'} variant={'error'} onClick={hide}>
						Zrušit
					</Button>
				</div>
			</div>
		</Overlay>
	);
};

export default ConfirmDialog;
