import { FC, ReactNode, useEffect } from 'react';

import cl from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
	visible: boolean;
	setVisible: (value: boolean) => void;
	children: ReactNode;
	hideCallback?: () => void;
}

const Modal: FC<ModalProps> = ({ visible, setVisible, children, hideCallback }) => {
	const modalClasses = [cl.modal];
	const contentClasses = [cl.modal__content];

	if (visible) {
		modalClasses.push(cl.visible);
		contentClasses.push(cl.visible);
	}

	const hide = () => {
		if (hideCallback) {
			hideCallback();
		}
		setVisible(false);
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				hide();
			}
		};

		document.addEventListener('keydown', onKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = 'visible';
		};
	}, [setVisible]);

	return (
		<CSSTransition
			in={visible}
			timeout={300}
			classNames={{
				enter: cl.enter,
				enterActive: cl.enter_active,
				exit: cl.exit,
				exitActive: cl.exit_active,
			}}
		>
			<div className={modalClasses.join(' ')} onClick={hide}>
				<div className={contentClasses.join(' ')} onClick={e => e.stopPropagation()}>
					{children}
				</div>
			</div>
		</CSSTransition>
	);
};

export default Modal;