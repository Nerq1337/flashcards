import { forwardRef, InputHTMLAttributes } from 'react';

import cl from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
	return (
		<label className={cl.wrapper} htmlFor={label}>
			<div className={cl.label}>{label}</div>
			<input ref={ref} {...props} className={cl.input} type={'text'}/>
		</label>
	);
});

export default Input;