import { useReducer } from 'react';
import { Task } from './Task';
import { Time, addTwoTimes } from '../useTime/Time';
import { v4 as uuidv4 } from 'uuid';

export enum ActionType {
	Create = 'create',
	Delete = 'delete',
	Update = 'update',
}

type Action = { type: ActionType; task: Task };
type State = {
	tasks: Task[];
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.Create:
			return { tasks: [...state.tasks, action.task] };
		case ActionType.Delete:
			return {
				tasks: state.tasks.filter((task) => task.id === action.task.id),
			};
		case ActionType.Update:
			return {
				tasks: state.tasks.map((task) =>
					task.id === action.task.id ? action.task : task,
				),
			};
	}
};

export interface useTasksValues {
	tasks: Task[];
	createTask: (taskTitle: string, taskEndTime: Time) => void;
	deleteTask: (task: Task) => void;
	updateTask: (task: Task) => void;
}

export const useTasks = (): useTasksValues => {
	const [{ tasks }, dispatch] = useReducer(reducer, { tasks: [] });

	const createTask = (taskTitle: string, taskEndTime: Time) => {
		const taskId = uuidv4();
		let taskStartTime: Time;
		if (tasks.length > 0) {
			taskStartTime = tasks[tasks.length - 1].period.to;
		} else {
			taskStartTime = {
				minutes: 0,
				seconds: 0,
			};
		}

		const taskEndTimeRelative = addTwoTimes(taskStartTime, taskEndTime);
		const task: Task = {
			id: taskId,
			title: taskTitle,
			period: {
				from: taskStartTime,
				to: taskEndTimeRelative,
			},
		};
		dispatch({ type: ActionType.Create, task });
	};

	const deleteTask = (task: Task) => {
		dispatch({ type: ActionType.Delete, task });
	};

	const updateTask = (task: Task) => {
		dispatch({ type: ActionType.Update, task });
	};

	return { tasks, createTask, deleteTask, updateTask };
};
