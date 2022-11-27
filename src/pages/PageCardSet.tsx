import { FC, useEffect, useState } from 'react';

import { ICardSet } from '../types/card';

import useCard from '../hooks/useCard';

import CardSetPanel from '../components/cards/CardSetPanel/CardSetPanel';
import CardList from '../components/cards/CardList/CardList';
import MyError from '../components/MyError/MyError';
import { useParams } from 'react-router-dom';


const PageCardSet: FC = () => {
	const [cardSet, setCardSet] = useState<ICardSet>();

	const { getCardSet, setCurrentCardSetID } = useCard();

	const params = useParams<{ id: string }>();

	useEffect(() => {
		if (!params.id) {
			setCurrentCardSetID(-1);
			setCardSet(undefined);
			return;
		}

		const setID = parseInt(params.id);
		const set = getCardSet(setID);

		setCurrentCardSetID(setID);
		setCardSet(set);

		// eslint-disable-next-line
	}, [params.id, getCardSet]);

	return (
		cardSet
			? <>
				<CardSetPanel label={cardSet.name}/>
				<CardList cards={cardSet.cards}/>
			</>
			: <MyError
				label={`Card set not found!`}
				description={`Sorry, we can't find that card set.`}
			/>
	);
};

export default PageCardSet;