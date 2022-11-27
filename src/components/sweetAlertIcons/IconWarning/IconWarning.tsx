import { FC } from 'react';

import './IconWarning.scss';


const IconWarning: FC = () => {
	return (
		<div className="swal-icon-warning">
			<span className="swal-icon-warning__body"></span>
			<span className="swal-icon-warning__dot"></span>
		</div>
	);
};

export default IconWarning;