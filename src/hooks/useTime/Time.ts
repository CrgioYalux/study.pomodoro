export type Time = {
	seconds: number;
	minutes: number;
};

export const formatTime = (time: Time): string => {
	return `${time.minutes < 10 ? '0' + String(time.minutes) : time.minutes}:${
		time.seconds < 10 ? '0' + String(time.seconds) : time.seconds
	}`;
};

export const timeToSeconds = (time: Time): number => {
	return time.minutes * 60 + time.seconds;
};

export const secondsToTime = (seconds: number): Time => {
	return {
		minutes: Math.floor(seconds / 60),
		seconds: seconds % 60,
	};
};
