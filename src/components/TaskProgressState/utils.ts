import { Time, timeToSeconds } from '../../hooks/useTime/Time';
import { Task } from '../../hooks/useTasks/Task';

export const isTaskDone = (task: Task, time: Time): Boolean => {
	const taskTimeToInSeconds = timeToSeconds(task.period.to);
	const timeInSeconds = timeToSeconds(time);

	return taskTimeToInSeconds <= timeInSeconds;
};

export const isActualTask = (task: Task, time: Time): Boolean => {
	const taskTimeToInSeconds = timeToSeconds(task.period.to);
	const taskTimeFromInSeconds = timeToSeconds(task.period.from);
	const timeInSeconds = timeToSeconds(time);

	return (
		timeInSeconds > taskTimeFromInSeconds && taskTimeToInSeconds > timeInSeconds
	);
};
