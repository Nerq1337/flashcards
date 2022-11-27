import { FC } from 'react';

import './ProgressBar.scss'


interface ProgressBarProps {
	now: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ now = -1 }) => {
	return (
		<div className={'progress-bar' + (now === -1 ? '' : ' progress-bar_show')}>
			<span className={'progress-bar__line progress-bar__line_1'} style={{width: `${now}%`}}></span>
			<span className={'progress-bar__line progress-bar__line_2'} style={{width: `${100 - now}%`}}></span>
		</div>
	);
};

export default ProgressBar;