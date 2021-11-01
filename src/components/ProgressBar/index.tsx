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
			<strong>
				{progress === '0%'
					? 'Done'
					: formatTime(subtractTwoTimes(timer.time, period.to))}
			</strong>
		</div>
	);
};
