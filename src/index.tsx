import React from 'react';
import ReactDOM from 'react-dom/client';

import { HashRouter } from 'react-router-dom';

import App from './App';
import CardProvider from './context/card/CardProvider';
import ModalProvider from './context/modal/ModalProvider';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<CardProvider>
			<ModalProvider>
				<HashRouter>
					<App/>
				</HashRouter>
			</ModalProvider>
		</CardProvider>
	</React.StrictMode>,
);
