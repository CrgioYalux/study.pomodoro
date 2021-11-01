import './Dashboard.scss';
import { DisplayTask } from '../DisplayTask';
import { useTasksUtil } from '../../providers/TasksUtil';
import { Task } from '../../hooks/useTasks/Task';
import { DraggableContainer } from '../DraggableContainer';

export const Dashboard = () => {
	const { tasks } = useTasksUtil();

	if (tasks.length === 0)
		return (
			<DraggableContainer classNameContainer="Dashboard-container _empty">
				<h3 className="Dashboard-notasks">0 tasks</h3>
			</DraggableContainer>
		);

	return (
		<DraggableContainer classNameContainer="Dashboard-container _not_empty">
			{tasks.map((task: Task) => (
				<DisplayTask key={task.id} task={task} />
			))}
		</DraggableContainer>
	);
};
