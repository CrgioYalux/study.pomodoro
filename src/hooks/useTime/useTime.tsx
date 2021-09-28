import { useState, useEffect, useRef } from 'react';

export type Time = {
	seconds: number;
	minutes: number;
};

interface useTimerProps {
	from: Time;
	to: Time;
}

interface useTimerValue {
	time: Time;
	stopTimer: () => void;
	startTimer: () => void;
}

export const useTimer = ({ from, to }: useTimerProps): useTimerValue => {
	const [seconds, setSeconds] = useState(from.seconds);
	const [minutes, setMinutes] = useState(from.minutes);
	const [counterRunning, setCounterRunning] = useState(false);

	const counterRef = useRef<NodeJS.Timeout>();

	const stopCounting = (): void => {
		counterRef.current && clearInterval(counterRef.current);
		setCounterRunning(false);
	};

	const startCounting = (): void => {
		setCounterRunning(true);
	};

	useEffect(() => {
		if (counterRunning) {
			counterRef.current && clearInterval(counterRef.current);
			counterRef.current = setInterval(() => {
				setSeconds((s) => (s === 59 ? 0 : s + 1));
			}, 1000);
			return () => stopCounting();
		}
	}, [counterRunning]);

	useEffect(() => {
		if (seconds === 59) {
			const addMinute = setTimeout(() => {
				setMinutes((m) => m + 1);
			}, 1000);
			return () => clearTimeout(addMinute);
		}
	}, [seconds]);

	useEffect(() => {
		if (seconds === to.seconds && minutes === to.minutes) {
			stopCounting();
		}
	}, [seconds, minutes, to]);

	return {
		time: { seconds, minutes },
		stopTimer: stopCounting,
		startTimer: startCounting,
	};
};
