import './TaskProgressState.scss';
import { Fragment } from 'react';
import { Task } from '../../hooks/useTasks/Task';
import { formatTime } from '../../hooks/useTime/Time';
import { isTaskDone, isActualTask } from './utils';
import { useTimerUtil } from '../../providers/TimerUtil';

interface TaskProgressStateProps {
	task: Task;
}

export const TaskProgressState = ({ task }: TaskProgressStateProps) => {
	const { time, isTimerRunning } = useTimerUtil();

	if (isTaskDone(task, time)) return <Fragment />;
	if (isActualTask(task, time)) {
		if (isTimerRunning)
			return (
				<small className="TaskProgressState-container">currently working</small>
			);
		else return <small className="TaskProgressState-container">stopped</small>;
	}
	return (
		<small className="TaskProgressState-container">
			starts at <strong>{formatTime(task.period.from)}</strong>
		</small>
	);
};
