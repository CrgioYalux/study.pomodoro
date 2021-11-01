import './DisplayTask.scss';
import { ProgressBar } from '../ProgressBar';
import { Task } from '../../hooks/useTasks/Task';
import { TaskProgressState } from '../TaskProgressState';
interface TaskProps {
	task: Task;
}

export const DisplayTask = ({ task }: TaskProps) => {
	return (
		<li className="DisplayTask-container">
			<strong>{task.title}</strong>
			<ProgressBar period={task.period} duration={task.duration} />
			<TaskProgressState task={task} />
		</li>
	);
};
