import './Dashboard.scss';
import { DisplayTask } from '../DisplayTask';
import { useTasksUtil } from '../../providers/TasksUtil';
import { Task } from '../../hooks/useTasks/Task';
export const Dashboard = () => {
	const { tasks } = useTasksUtil();
	return (
		<ul className="Dashboard-container">
			{tasks.map(({ id, title, period, duration }: Task) => (
				<DisplayTask
					key={id}
					title={title}
					period={period}
					duration={duration}
				/>
			))}
		</ul>
	);
};
