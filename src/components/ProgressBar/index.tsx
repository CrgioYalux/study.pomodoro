import './ProgressBar.scss';
import {
	Period,
	Time,
	formatTime,
	subtractTwoTimes,
} from '../../hooks/useTime/Time';
import { useTimerUtil } from '../../providers/TimerUtil';
import { progressInPercentage } from './utils';
import { isTaskStarted } from './utils';

interface ProgressBarProps {
	period: Period;
	duration: Time;
}

export const ProgressBar = ({ period, duration }: ProgressBarProps) => {
	const timer = useTimerUtil();

	const progress = progressInPercentage(
		duration,
		subtractTwoTimes(timer.time, period.from),
	);

	const progressBarText =
		progress === '0%'
			? ' '
			: formatTime(subtractTwoTimes(timer.time, period.to));

	if (!isTaskStarted(period.from, timer.time)) {
		return (
			<div className="ProgressBar-container">
				<div className="ProgressBar-background"></div>
				<strong>{formatTime(duration)}</strong>
			</div>
		);
	}

	return (
		<div className="ProgressBar-container">
			<div
				className="ProgressBar-background"
				style={{
					right: progress,
				}}
			></div>
			<strong>{progressBarText}</strong>
		</div>
	);
};
