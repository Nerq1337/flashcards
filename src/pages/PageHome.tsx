import { FC, useEffect } from 'react';

import CardSetList from '../components/cards/CardSetList/CardSetList';
import useCard from '../hooks/useCard';
import CardSetsPanel from '../components/cards/CardSetsPanel/CardSetsPanel';


const PageHome: FC = () => {
	const { setCardSetsFromStorage, cardSets } = useCard();

	useEffect(() => {
		if (cardSets.length === 0) {
			setCardSetsFromStorage();
		}
	}, [setCardSetsFromStorage, cardSets]);

	return (
		<div>
			<CardSetsPanel/>
			<CardSetList/>
		</div>
	);
};

export default PageHome;