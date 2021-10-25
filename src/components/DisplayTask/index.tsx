import './DisplayTask.scss';
import { Period, Time } from '../../hooks/useTime/Time';
import { useTimerUtil } from '../../providers/TimerUtil';
import { ProgressBar } from '../ProgressBar';
import { formatTime } from '../../hooks/useTime/Time';
interface TaskProps {
	title: string;
	period: Period;
	duration: Time;
}

export const DisplayTask = ({ title, period, duration }: TaskProps) => {
	const { time, timerRunning } = useTimerUtil();
	const taskGoing =
		time.minutes >= period.from.minutes && time.seconds >= period.from.seconds;
	const taskDone =
		period.to.minutes - time.minutes <= 0 &&
		period.to.seconds - time.seconds <= 0;

	if (taskDone) {
		return (
			<li className="DisplayTask-container">
				<strong>{title}</strong>
				<ProgressBar period={period} duration={duration} />
			</li>
		);
	}
	if (taskGoing && timerRunning) {
		return (
			<li className="DisplayTask-container">
				<strong>{title}</strong>
				<ProgressBar period={period} duration={duration} />
				<small>currently working</small>
			</li>
		);
	}
	return (
		<li className="DisplayTask-container">
			<strong>{title}</strong>
			<ProgressBar period={period} duration={duration} />
			<small>
				starts at <strong>{formatTime(period.from)}</strong>
			</small>
		</li>
	);
};
