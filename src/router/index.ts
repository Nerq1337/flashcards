import { ComponentType } from 'react';

import PageHome from '../pages/PageHome';
import PageCardSet from '../pages/PageCardSet';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

export interface IRoute {
	path: string;
	component: ComponentType;
}

export enum RouteNames {
	HOME = '/',
	CARD_SET = '/card-sets/:id',
	ERROR = '*'
}

export const appRoutes: IRoute[] = [
	{ path: RouteNames.HOME, component: PageHome },
	{ path: RouteNames.CARD_SET, component: PageCardSet },
	{ path: RouteNames.ERROR, component: PageNotFound },
];