import { FC } from 'react';

import './PageNotFound.scss'

const PageNotFound: FC = () => {
	return (
		<div className={'error-page'}>
			<div className={'error-page__content'}>
				<h2 className={'error-page__404'}>404</h2>
				<div className={'error-page__title'}>Oops! Nothing was found</div>
				<div className={'error-page__text'}>
					The page you are looking for might have been removed had its name changed or is temporarily unavailable. Return to homepage
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;