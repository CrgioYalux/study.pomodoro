import './CreateTask.scss';

import { Time } from '../../hooks/useTime/Time';
import { timeOptions } from './utils';
import { useTasksUtil } from '../../providers/TasksUtil';
import { DraggableContainer } from '../DraggableContainer';

export const CreateTask = () => {
	const { createTask } = useTasksUtil();

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			title: { value: string; focus: () => void };
			time_option: {
				value: string;
			};
		};

		if (target.title.value && target.time_option.value) {
			const taskTitle: string = target.title.value;
			const taskEndTime: Time = JSON.parse(target.time_option.value);

			createTask(taskTitle, taskEndTime);

			target.title.value = '';
			target.title.focus();
		}
	};

	return (
		<DraggableContainer classNameGrabber="CreateTask-Grabber">
			<form onSubmit={handleSubmit} className="CreateTask-container">
				<input
					type="text"
					name="title"
					placeholder="Write a title for the task"
					className="input-title"
					required
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
								required
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
		</DraggableContainer>
	);
};
