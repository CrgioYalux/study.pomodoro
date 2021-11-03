import './Dashboard.scss';
import { DisplayTask } from '../DisplayTask';
import { useTasksUtil } from '../../providers/TasksUtil';
import { DraggableContainer } from '../DraggableContainer';
import { useTimerUtil } from '../../providers/TimerUtil';
import { isTaskDone } from '../TaskProgressState/utils';

export const Dashboard = () => {
	const { tasks } = useTasksUtil();
	const { time } = useTimerUtil();
	const tasksDone = tasks.reduce<number>((acc, arr) => {
		if (isTaskDone(arr, time)) return acc + 1;
		else return acc + 0;
	}, 0);
	const tasksDoneText = `${tasksDone} / ${tasks.length} tasks done`;

	if (tasks.length === 0)
		return (
			<DraggableContainer classNameContainer="Dashboard-container _empty">
				<h3 className="Dashboard-notasks">0 tasks</h3>
			</DraggableContainer>
		);
	return (
		<DraggableContainer classNameContainer="Dashboard-container _not_empty">
			<DisplayTask
				task={
					tasks.find((task) => !isTaskDone(task, time)) ||
					tasks[tasks.length - 1]
				}
			/>
			<strong className="TasksDone">{tasksDoneText}</strong>
		</DraggableContainer>
	);
};
