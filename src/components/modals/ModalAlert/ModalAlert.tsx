import { FC } from 'react';

import { ModalAlertProps } from '../../../types/modal';

import Modal from '../../UI/Modal/Modal';

import useModal from '../../../hooks/useModal';
import IconSuccess from '../../sweetAlertIcons/IconSuccess/IconSuccess';
import IconError from '../../sweetAlertIcons/IconError/IconError';
import IconWarning from '../../sweetAlertIcons/IconWarning/IconWarning';

import './ModalAlert.scss';
import Button from '../../UI/Button/Button';


interface ComponentProps {
	visible: boolean;
	setVisible: (value: boolean) => void;
	props: ModalAlertProps;
}

const ModalAlert: FC<ComponentProps> = ({ visible, setVisible, props }) => {
	const { modalAlert } = useModal();

	const renderIcon = () => {
		switch (props.icon) {
			case 'success': {
				return <IconSuccess/>;
			}
			case 'error': {
				return <IconError/>;
			}
			case 'warning': {
				return <IconWarning/>;
			}
		}
	};

	return (
		<Modal visible={visible} setVisible={setVisible}>
			<div style={{ width: props.width, height: props.height }} className={'modal-alert'}>
				{renderIcon()}
				<h1 className={'modal-alert__title'}>{props.title}</h1>
				<div className={'modal-alert__text'}>
					{props.text}
				</div>
				<div className={'modal-alert__buttons'}>
					{props.btnCancel &&
						<Button onClick={modalAlert.hide}>Cancel</Button>
					}
					{props.btnConfirm ||
						<Button onClick={modalAlert.hide}>OK</Button>
					}
				</div>
			</div>
		</Modal>
	);
};

export default ModalAlert;