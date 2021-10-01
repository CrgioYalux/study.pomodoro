import { createContext, useContext } from 'react';
import { useTasks, useTasksValues } from '../../hooks/useTasks';

const TasksUtilContext = createContext<useTasksValues>({
	tasks: [],
	createTask: () => {},
	deleteTask: () => {},
	updateTask: () => {},
});

export const useTasksUtil = () => useContext(TasksUtilContext);

interface TasksUtilProviderProps {
	children: React.ReactNode;
}
export const TasksUtilProvider = ({ children }: TasksUtilProviderProps) => {
	const { tasks, createTask, deleteTask, updateTask } = useTasks();
	const value = {
		tasks,
		createTask,
		deleteTask,
		updateTask,
	};
	return (
		<TasksUtilContext.Provider value={value}>
			{children}
		</TasksUtilContext.Provider>
	);
};
