import './ProgressBar.scss';
import { Time, formatTime } from '../../hooks/useTime/Time';
import { progressInPercentage, timeLeft } from './utils';

interface ProgressBarProps {
	timer: Time;
	internalTime: Time;
}

export const ProgressBar = ({ internalTime, timer }: ProgressBarProps) => {
	const progress = progressInPercentage(internalTime, timer);

	return (
		<div className="ProgressBar-container">
			<div
				className="ProgressBar-background"
				style={{
					right: progress,
				}}
			></div>
			<strong>{formatTime(timeLeft(internalTime, timer))}</strong>
		</div>
	);
};
