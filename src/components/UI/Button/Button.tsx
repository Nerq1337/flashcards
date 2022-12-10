import { CSSProperties, FC, ReactNode, useEffect, useState } from 'react';

import './Button.scss';


type ButtonColors = 'gradient-violet'
	| 'gradient-orange'
	| 'gradient-green-blue'
	| 'gradient-rainbow'
	| 'gradient-green'
	| 'gradient-red'
	| 'white'
	| 'gradient-light-red'
	| 'gradient-light-blue'
	| 'gradient-light-green'

type ButtonSizes = 'small'
	| 'medium'
	| 'icon';

interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
	style?: CSSProperties;
	Size?: ButtonSizes;
	Color?: ButtonColors;
}

interface Variant extends Omit<ButtonProps, 'children' | 'onClick' | 'style'> {}


const Button: FC<ButtonProps> = ({ children, Size, Color, style, onClick }) => {
	const [variant, setVariant] = useState<Variant>();

	useEffect(() => {
		const defaultVariant: Variant = {
			Size: 'medium',
			Color: 'white',
		};

		const assignVariant = (target: any, source: any) => {
			for (const key in target) {
				const sourceValue = source[key];

				if (sourceValue) {
					target[key] = sourceValue;
				}
			}

			return target;
		};

		setVariant(
			assignVariant(defaultVariant, { Size, Color }),
		);
	}, [Size, Color]);

	return (
		<button
			className={`appButton appButton_${variant?.Color} appButton_${variant?.Size}`}
			onClick={onClick}
			style={style}
		>
			{children}
		</button>
	);
};

export default Button;