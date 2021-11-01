import { timeToSeconds, Time } from '../../hooks/useTime/Time';

export const timeToPercentage = (internalTime: Time, timer: Time): number => {
	return (timeToSeconds(timer) * 100) / timeToSeconds(internalTime);
};

export const progressInPercentage = (
	internalTime: Time,
	timer: Time,
): string => {
	const percentage = timeToPercentage(internalTime, timer);
	return percentage > 100 ? '0%' : `${100 - percentage}%`;
};

export const isTaskStarted = (taskTimeToStart: Time, time: Time): Boolean => {
	const taskTimeToStartInSeconds = timeToSeconds(taskTimeToStart);
	const timeInSeconds = timeToSeconds(time);

	return timeInSeconds >= taskTimeToStartInSeconds;
};
