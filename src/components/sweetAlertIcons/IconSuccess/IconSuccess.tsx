import { FC } from 'react';

import './IconSuccess.scss';

const IconSuccess: FC = () => {
	return (
		<div className="swal-icon-success">
			<span className="swal-icon-success__line swal-icon-success__line_tip"></span>
			<span className="swal-icon-success__line swal-icon-success__line_long"></span>
			<div className="swal-icon-success__placeholder"></div>
			<div className="swal-icon-success__fix"></div>
		</div>
	);
};

export default IconSuccess;