import { useContext } from 'react';
import { ModalContext } from '../context/modal/modalContext';

export default function useModal() {
	return useContext(ModalContext);
}