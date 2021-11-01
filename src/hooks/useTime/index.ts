import { useState, useEffect, useRef } from 'react';
import { Time } from './Time';
interface useTimerProps {
	from: Time;
	to: Time;
	autostart?: boolean;
}

export interface useTimerValues {
	time: Time;
	stopTimer: () => void;
	startTimer: () => void;
	restartTimer: () => void;
	isTimerRunning: boolean;
}

export const useTimer = ({
	from,
	to,
	autostart = false,
}: useTimerProps): useTimerValues => {
	const [seconds, setSeconds] = useState(from.seconds);
	const [minutes, setMinutes] = useState(from.minutes);
	const [isCounterRunning, setIsCounterRunning] = useState(autostart);
	const counterRef = useRef<NodeJS.Timeout>();

	const stopCounting = (): void => {
		setIsCounterRunning(false);
	};

	const startCounting = (): void => {
		setIsCounterRunning(true);
	};

	const restartCounting = (): void => {
		setIsCounterRunning(false);
		setSeconds(0);
		setMinutes(0);
	};

	useEffect(() => {
		counterRef.current && clearTimeout(counterRef.current);
		if (isCounterRunning) {
			counterRef.current = setTimeout(() => {
				let prevSeconds = seconds;
				setSeconds((s) => (s === 59 ? 0 : s + 1));
				if (prevSeconds === 59) {
					setMinutes((m) => m + 1);
				}
			}, 1000);
		}
	}, [isCounterRunning, seconds]);

	useEffect(() => {
		if (seconds === to.seconds && minutes === to.minutes) {
			stopCounting();
		}
	}, [seconds, minutes, to]);

	useEffect(() => {
		return () => stopCounting();
	}, []);

	return {
		time: { seconds, minutes },
		isTimerRunning: isCounterRunning,
		stopTimer: stopCounting,
		startTimer: startCounting,
		restartTimer: restartCounting,
	};
};
