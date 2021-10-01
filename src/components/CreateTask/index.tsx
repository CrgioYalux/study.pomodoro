import './CreateTask.scss';

import { Time } from '../../hooks/useTime/Time';
import { Task } from '../Task/Task';
import { timeOptions } from './utils';

export const CreateTask = () => {
	const createTask = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			title: { value: string; focus: () => void };
			time_option: {
				value: string;
			};
		};
		const taskTitle: string = target.title.value;
		const taskTime: Time = JSON.parse(target.time_option.value);
		const task: Task = {
			time: taskTime,
			title: taskTitle,
		};

		// do something with the task here

		target.title.value = '';
		target.title.focus();
	};

	return (
		<form onSubmit={createTask} className="CreateTask-container">
			<input
				type="text"
				name="title"
				placeholder="Write a title for the task"
				className="input-title"
				autoFocus
			/>
			<div className="CreateTask-time-options">
				{timeOptions.map((option, idx) => (
					<div key={idx} className="time-option">
						<input
							type="radio"
							name="time_option"
							id={`time_option_${option.minutes}${option.seconds}`}
							value={JSON.stringify({
								minutes: option.minutes,
								seconds: option.seconds,
							})}
						/>
						<label htmlFor={`time_option_${option.minutes}${option.seconds}`}>
							{option.label}
						</label>
					</div>
				))}
			</div>
			<input
				type="submit"
				value="Create task"
				className="CreateTask-submit-button"
			/>
		</form>
	);
};
