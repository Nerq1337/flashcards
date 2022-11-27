import { useRef } from 'react';

export default function useFocus<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const setFocus = () => { ref.current && ref.current.focus(); };

	return { ref, setFocus };
}