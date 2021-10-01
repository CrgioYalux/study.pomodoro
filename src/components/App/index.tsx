import './App.scss';
import { Timer } from '../Timer';
import { TimerUtilProvider } from '../../providers/TimerUtil';
import { TasksUtilProvider } from '../../providers/TasksUtil';
import { CreateTask } from '../CreateTask';

export const App = () => {
	return (
		<div className="App-container">
			<TimerUtilProvider>
				<Timer />
				<TasksUtilProvider>
					<CreateTask />
				</TasksUtilProvider>
			</TimerUtilProvider>
		</div>
	);
};
