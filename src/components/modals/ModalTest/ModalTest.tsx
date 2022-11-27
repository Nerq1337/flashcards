import { FC, useEffect, useState } from 'react';

import { ICard } from '../../../types/card';

import Modal from '../../UI/Modal/Modal';
import Card from '../../cards/Card/Card';
import Button from '../../UI/Button/Button';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';

import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';

import { HiMinus, HiPlus } from 'react-icons/hi';

import './ModalTest.scss';


interface IResults {
	correct: number;
	count: number;
	progress: number;
}

const initialResults: IResults = { correct: 0, count: 0, progress: -1 };

const ModalTest: FC = () => {
	const [cards, setCards] = useState<ICard[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [results, setResults] = useState(initialResults);

	const { getCardSet, currentCardSetID } = useCard();

	const { modalTest } = useModal();

	useEffect(() => {
		if (!currentCardSetID) {
			return;
		}

		const cards = [...getCardSet(currentCardSetID)?.cards ?? []];

		for (let i = cards.length - 1; i > 0; --i) {
			const j = (Math.random() * (i + 1)) | 0;
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}

		setCards(cards);
	}, [modalTest.visible, currentCardSetID, getCardSet]);

	const answer = (results: () => IResults) => {
		const res = results();

		setResults(res);
		setCurrentIndex(currentIndex + 1);

		if (currentIndex === cards.length - 1) {
			shuffleFlashcards();
			setCurrentIndex(0);
		}
	};

	const wrongResults = (): IResults => ({
		...results,
		count: results.count + 1,
		progress: ((results.correct) / (results.count + 1)) * 100,
	});

	const correctResults = (): IResults => ({
		...results,
		correct: results.correct + 1,
		count: results.count + 1,
		progress: ((results.correct + 1) / (results.count + 1)) * 100,
	});

	const shuffleFlashcards = () => {
		const shuffled = cards;

		for (let i = shuffled.length - 1; i > 0; --i) {
			const j = (Math.random() * (i + 1)) | 0;
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}

		setCards(shuffled);
	};

	return (
		<Modal
			visible={modalTest.visible} setVisible={modalTest.setVisible}
			hideCallback={() => setResults(initialResults)}
		>
			<div className={'modal-test'}>
				<ProgressBar now={results.progress}/>

				{cards[currentIndex] &&
					<Card card={cards[currentIndex]}/>
				}

				{cards.length === 0 &&
					<h3>Flashcards list is empty!</h3>
				}

				<div className="modal-test__buttons">
					<div className={'modal-test__buttons-row'}>
						<Button Color="gradient-red" onClick={() => answer(wrongResults)}>
							<HiMinus size={18}/>
						</Button>
						<Button Color="gradient-green" onClick={() => answer(correctResults)}>
							<HiPlus size={20}/>
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ModalTest;