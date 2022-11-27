import { useContext } from 'react';
import { CardContext } from '../context/card/cardContext';

export default function useCard() {
	return useContext(CardContext);
}