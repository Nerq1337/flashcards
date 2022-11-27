import { ReactNode } from 'react';

export interface ModalAlertProps {
	icon: 'success' | 'error' | 'warning';
	title: string;
	text: string;
	width?: number;
	height?: number;
	btnConfirm?: ReactNode;
	btnCancel?: boolean;
	btnConfirmCallback?: () => void;
}