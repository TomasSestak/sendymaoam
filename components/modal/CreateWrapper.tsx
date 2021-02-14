import { FunctionComponent, ReactNode, useEffect } from 'react';
import Typo from '@/components/core/Typo';
import Button from '@/components/core/Button';
import Icon from '@/components/core/Icon';
import { useForm } from 'react-hook-form';

interface Props {
	label: string;
	onSubmit: () => Promise<void>;
	hide: () => void;
	children: ReactNode;
}

const CreateWrapper: FunctionComponent<Props> = ({ label, onSubmit, hide, children }) => {
	useEffect(() => {
		const hideHandler = ({ keyCode }) => keyCode === 27 && hide();
		document.addEventListener('keydown', hideHandler);

		return () => {
			document.removeEventListener('keydown', hideHandler);
		};
	}, []);

	return (
		<div className="create-wrapper">
			<header className="create-wrapper__header">
				<Typo variant={'h2'} className={'create-wrapper__label'} color={'primary-dark-blue'}>
					{label}
				</Typo>
				<Icon name={'close'} onClick={hide} className={'create-wrapper__close'} />
			</header>
			<form className="create-wrapper__form" onSubmit={onSubmit}>
				<div className="create-wrapper__inner">{children}</div>
				<Button variant={'primary'} type={'submit'} className={'create-wrapper__button'}>
					potvrdit
				</Button>
			</form>
		</div>
	);
};

export default CreateWrapper;
