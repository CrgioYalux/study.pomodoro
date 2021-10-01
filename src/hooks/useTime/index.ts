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
}

export const useTimer = ({
	from,
	to,
	autostart,
}: useTimerProps): useTimerValues => {
	const [seconds, setSeconds] = useState(from.seconds);
	const [minutes, setMinutes] = useState(from.minutes);
	const [counterRunning, setCounterRunning] = useState(false);

	const counterRef = useRef<NodeJS.Timeout>();

	const stopCounting = (): void => {
		counterRef.current && clearTimeout(counterRef.current);
		setCounterRunning(false);
	};

	const startCounting = (): void => {
		setCounterRunning(true);
	};

	const restartCounting = (): void => {
		stopCounting();
		setSeconds(0);
		setMinutes(0);
	};

	useEffect(() => {
		if (autostart) startCounting();
		return () => stopCounting();
	}, [autostart]);

	useEffect(() => {
		if (counterRunning) {
			counterRef.current && clearTimeout(counterRef.current);
			counterRef.current = setTimeout(() => {
				let prevSeconds = seconds;
				setSeconds((s) => (s === 59 ? 0 : s + 1));
				if (prevSeconds === 59) {
					setMinutes((m) => m + 1);
				}
			}, 1000);
		}
	}, [counterRunning, seconds]);

	useEffect(() => {
		if (seconds === to.seconds && minutes === to.minutes) {
			stopCounting();
		}
	}, [seconds, minutes, to]);

	return {
		time: { seconds, minutes },
		stopTimer: stopCounting,
		startTimer: startCounting,
		restartTimer: restartCounting,
	};
};
