import { FC } from 'react';

import AppRouter from './components/AppRouter';

import './styles/style.scss';


const App: FC = () => {
	return (
		<div className={'app-container'}>
			<AppRouter/>
		</div>
	)
};

export default App;