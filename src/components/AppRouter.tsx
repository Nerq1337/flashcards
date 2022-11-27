import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { appRoutes } from '../router';

const AppRouter: FC = () => {

	return (
		<Routes>
			{appRoutes.map(route =>
				<Route key={route.path} path={route.path} element={<route.component/>}/>,
			)}
		</Routes>
	);
};

export default AppRouter;