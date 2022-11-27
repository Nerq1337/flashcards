import { FC } from 'react';

import { BsFillExclamationTriangleFill } from 'react-icons/bs';

import './MyError.scss';
import TextReturnHome from '../TextReturnHome/TextReturnHome';


interface ErrorProps {
	label: string;
	description: string;
}

const MyError: FC<ErrorProps> = ({ label, description }) => {

	return (
		<div className={'my-error'}>
			<div className="my-error__content">
				<BsFillExclamationTriangleFill size={150} color={'#f74040'}/>
				<h1 className={'my-error__title'}>{label}</h1>
				<div className={'my-error__label'}>{description} <TextReturnHome/></div>
			</div>
		</div>
	);
};

export default MyError;