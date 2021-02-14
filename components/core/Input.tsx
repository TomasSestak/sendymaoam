import { ChangeEvent, FocusEvent, FunctionComponent, LegacyRef, ReactComponentElement, useState } from 'react';
import Typo from '@/components/core/Typo';
import { animated, useSpring, useTransition } from 'react-spring';
import { FieldError } from 'react-hook-form';

interface Props {
	readonly label: string;
	readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	readonly register: LegacyRef<HTMLInputElement>;
	readonly name: string;
	readonly type?: string;
	readonly className?: string;
	readonly inputClassName?: string;
	readonly placeholder?: string;
	readonly error: FieldError;
	readonly defaultValue?: string;
}

const AnimatedTypo = animated(Typo);

const Input: FunctionComponent<Props> = ({
	label,
	onChange,
	register,
	name,
	type,
	className,
	inputClassName,
	placeholder,
	error,
	defaultValue,
}): ReactComponentElement<'div'> => {
	const [focus, setFocus] = useState<boolean>(false);

	const transitions = useTransition(!!error, null, {
		from: { transform: 'scale(0)', opacity: 0 },
		enter: { transform: 'scale(1)', opacity: 1 },
		leave: { transform: 'scale(0)', opacity: 0 },
	});

	const transform = useSpring({
		transform: `translateZ(0) perspective(1px) translateY(${focus ? -16 : 0}px) scale(${focus ? 0.8 : 1})`,
	});

	return (
		<div className={`input ${className ? className : ''} ${error ? 'input--error' : ''}`}>
			<input
				id={name}
				name={name}
				placeholder={placeholder}
				type={type || 'text'}
				className={`input__item ${inputClassName ? inputClassName : ''} typo typo--xl typo--primary-dark-blue`}
				ref={register}
				defaultValue={defaultValue}
				autoComplete={'on'}
				onFocus={() => setFocus(true)}
				onBlur={(event: FocusEvent<HTMLInputElement>) => setFocus(!!event.target.value)}
				onChange={onChange}
			/>

			<AnimatedTypo
				Tag={'label'}
				color={'primary-dark-blue'}
				variant={'xl'}
				htmlFor={name}
				className="input__label"
				style={transform}
			>
				{label}
			</AnimatedTypo>

			{transitions.map(
				({ item, key, props }) =>
					item && (
						<AnimatedTypo variant={'xs'} color={'error'} className="input__error" style={props} key={key}>
							{error?.message}
						</AnimatedTypo>
					)
			)}
		</div>
	);
};

export default Input;
