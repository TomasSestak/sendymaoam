import { forwardRef, FunctionComponent, ReactComponentElement } from 'react';
import Typo from '@/components/core/Typo';
import Icon from '@/components/core/Icon';

type Props = {
	readonly variant: 'primary' | 'secondary' | 'terciary' | 'success' | 'error';
	readonly length?: 'full' | 'min';
	readonly disabled?: boolean;
	readonly children: string;
	readonly className?: string;
	readonly icon?: boolean | string;
} & (
	| {
			readonly type: 'submit';
			readonly onClick?: never;
			readonly href?: never;
	  }
	| {
			readonly type: 'button';
			readonly onClick?: () => void;
			readonly href?: never;
	  }
	| {
			readonly type?: never;
			readonly onClick?: () => void;
			readonly href?: string;
	  }
);

const Button: FunctionComponent<Props> = forwardRef<HTMLAnchorElement & HTMLButtonElement, Props>(
	(
		{ variant, length, onClick, disabled, href, children, className, type, icon = true },
		ref
	): ReactComponentElement<'button' | 'a'> => {
		let Tag: keyof JSX.IntrinsicElements = 'a';

		if (type) {
			Tag = 'button';
		}

		return (
			<Tag
				href={href}
				onClick={onClick}
				ref={ref}
				type={type}
				className={`${className ? className : ''} button button--${variant} ${
					length ? `button--${length}` : ''
				} ${disabled ? 'button--disabled' : ''}`}
			>
				{variant === 'terciary' && icon && (
					<Icon name={typeof icon === 'string' ? icon : 'trash'} className={'button__icon'} />
				)}
				<Typo
					Tag={'span'}
					variant={variant === 'primary' ? 'xl' : 'xs'}
					weight={'medium'}
					className={'button__label'}
				>
					{children}
				</Typo>
				{variant === 'secondary' && !icon && <Icon name={'plus'} className={'button__icon'} />}
			</Tag>
		);
	}
);

export default Button;
