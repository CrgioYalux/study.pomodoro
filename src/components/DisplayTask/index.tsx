import './DisplayTask.scss';
import { Period, Time } from '../../hooks/useTime/Time';
import { ProgressBar } from '../ProgressBar';
import { formatTime } from '../../hooks/useTime/Time';
interface TaskProps {
	title: string;
	period: Period;
	duration: Time;
}

export const DisplayTask = ({ title, period, duration }: TaskProps) => {
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
