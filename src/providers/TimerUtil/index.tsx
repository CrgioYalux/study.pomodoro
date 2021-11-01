import { useTimer, useTimerValues } from '../../hooks/useTime';
import { TimePreConfig } from '../../hooks/useTime/Time';
import { createContext, useContext } from 'react';

const TimerUtilContext = createContext<useTimerValues>({
	time: TimePreConfig.FromZero,
	startTimer: () => {},
	stopTimer: () => {},
	restartTimer: () => {},
	isTimerRunning: false,
});

export const useTimerUtil = () => useContext(TimerUtilContext);

interface TimerUtilProviderProps {
	children: React.ReactNode;
}
export const TimerUtilProvider = ({ children }: TimerUtilProviderProps) => {
	const value = useTimer(TimePreConfig.FromZeroToInfinite);
	return (
		<TimerUtilContext.Provider value={value}>
			{children}
		</TimerUtilContext.Provider>
	);
};
