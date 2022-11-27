import { FC } from 'react';

import './IconError.scss';


const IconError: FC = () => {
	return (
		<div className="swal-icon-error">
				<span className="swal-icon-error__x-mark">
					<span className="swal-icon-error__line swal-icon-error__line_left"></span>
					<span className="swal-icon-error__line swal-icon-error__line_right"></span>
				</span>
			<div className="swal-icon-error__placeholder"></div>
			<div className="swal-icon-error__fix"></div>
		</div>
	);
};

export default IconError;