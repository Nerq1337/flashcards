import { FC } from 'react';

import { ICardSet } from '../../../types/card';

import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';

import { BiImport, BiShare } from 'react-icons/bi';

import './CardSetsPanel.scss';


const CardSetsPanel: FC = () => {
	const { getConfig, setConfig } = useCard();

	const { modalAlert } = useModal();

	const shareSets = () => {
		const config = getConfig();

		if (!navigator.clipboard) {
			modalAlert.show({
				title: 'Error',
				text: `Something went wrong. "navigator.clipboard" is undefined`,
				icon: 'error',
			});
		}

		navigator.clipboard.writeText(config)
			.then(
				() => {
					modalAlert.show({
						title: 'Success',
						text: 'The card sets are copied to the clipboard!',
						icon: 'success',
					});
				},
				(reason) => {
					modalAlert.show({
						title: 'Error',
						text: reason,
						icon: 'error',
					});
				},
			);
	};

	const importSets = () => {
		navigator.clipboard.readText()
			.then((text) => {
				try {
					const cardSets: ICardSet[] = JSON.parse(text);

					// Simple format validation
					void cardSets[0].cards[0].front.title;
				} catch (error) {
					modalAlert.show({
						title: 'Error',
						text: 'Invalid config format',
						icon: 'error',
					});

					return;
				}

				modalAlert.show({
					title: 'Success',
					text: 'The card sets were imported!',
					icon: 'success',
				});

				setConfig(text);
			});
	};

	return (
		<div className={'sets-panel'}>
			<h1 className={'sets-panel__title'}>Flashcard sets</h1>
			<div className={'sets-panel__buttons'}>
				<button onClick={shareSets} className={'sets-panel__button sets-panel__button_share'}>
					<BiShare color={'#292929'} size={24}/>
				</button>
				<button onClick={importSets} className={'sets-panel__button sets-panel__button_import'}>
					<BiImport color={'#292929'} size={24}/>
				</button>
			</div>
		</div>
	);
};

export default CardSetsPanel;