import { useTimer, useTimerValues } from '../../hooks/useTime';
import { TimePreConfig } from '../../hooks/useTime/Time';
import { createContext, useContext } from 'react';

const TimerUtilContext = createContext<useTimerValues>({
	time: TimePreConfig.FromZero,
	startTimer: () => {},
	stopTimer: () => {},
	restartTimer: () => {},
});

export const useTimerUtil = () => useContext(TimerUtilContext);

interface TimerUtilProviderProps {
	children: React.ReactNode;
}
export const TimerUtilProvider = ({ children }: TimerUtilProviderProps) => {
	const { time, restartTimer, startTimer, stopTimer } = useTimer(
		TimePreConfig.FromZeroToInfinite,
	);
	const value = {
		time,
		restartTimer,
		startTimer,
		stopTimer,
	};
	return (
		<TimerUtilContext.Provider value={value}>
			{children}
		</TimerUtilContext.Provider>
	);
};
