import {CSSProperties, FunctionComponent, ReactComponentElement, ReactNode} from 'react';

type HeadlineTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TypoVariant = HeadlineTags | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type TypoTag = HeadlineTags | 'p' | 'span' | 'label' | 'address' | 'th' | 'td' | 'div';

declare type Props = {
	readonly variant: TypoVariant;
	Tag?: TypoTag;
	readonly color?: 'primary-dark-blue' | 'white' | 'primary-blue-grey' | 'error';
	readonly className?: string;
	readonly style?: CSSProperties;
	readonly htmlFor?: string; //TODO: ONLY WHEN TAG IS LABEL
	readonly onClick?: () => void
	readonly weight?: 'bold' | 'semi-bold' | 'medium';
} & ({
	readonly html: string;
	readonly children?: never;
} | {
	readonly html?: never;
	readonly children: ReactNode;
});

const Typo: FunctionComponent<Props> = ({
											variant,
											Tag,
											color,
											className,
											htmlFor,
											html,
											children,
											style,
											onClick,
											weight
										}): ReactComponentElement<TypoTag> => {
	if (!Tag) {
		switch (variant) {
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
			case 'h5':
			case 'h6':
				Tag = variant;
				break;
			default:
				Tag = 'p';
		}
	}

	const classes: string = `${className ? className : ''} typo typo--${variant} ${color ? `typo--${color}` : ''} ${weight ? `typo--${weight}` : ''}`;

	return (
		<>
			{html && (
				<Tag
					htmlFor={htmlFor}
					style={style}
					className={classes}
					dangerouslySetInnerHTML={{__html: html}}
					onClick={onClick}
				/>
			)}
			{children && (
				<Tag
					htmlFor={htmlFor}
					style={style}
					className={classes}
					onClick={onClick}
				>
					{children}
				</Tag>
			)}
		</>
	);
};

export default Typo;
