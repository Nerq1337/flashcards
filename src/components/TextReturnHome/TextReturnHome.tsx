import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import './TextReturnHome.scss'


const TextReturnHome: FC = () => {
	const nav = useNavigate();

	return (
		<span className={'return-home'}
			  onClick={() => nav('/')}
		>
			Return to homepage.
		</span>
	);
};

export default TextReturnHome;