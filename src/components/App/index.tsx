import './App.scss';
import { Timer } from '../Timer';
import { TimerUtilProvider } from '../../providers/TimerUtil';
import { TasksUtilProvider } from '../../providers/TasksUtil';
import { CreateTask } from '../CreateTask';
import { Dashboard } from '../Dashboard';
import { DragDropProvider } from '../../providers/DragDrop';

export const App = () => {
	return (
		<TimerUtilProvider>
			<DragDropProvider classNameBackground="Background-container">
				<Timer />
				<TasksUtilProvider>
					<CreateTask />
					<Dashboard />
				</TasksUtilProvider>
			</DragDropProvider>
		</TimerUtilProvider>
	);
};
