import './Timer.scss';
import { useTimer } from '../../hooks/useTime';
import { TimeConfig, formatTime } from '../../hooks/useTime/Time';

export const Timer = () => {
	const { startTimer, stopTimer, restartTimer, time } = useTimer(
		TimeConfig.FromZeroToInfinite,
	);

	return (
		<div className="Timer-container">
			<div className="Timer-show">
				<strong>{formatTime(time)}</strong>
			</div>
			<div className="Timer-control">
				<button onClick={startTimer} className="button">
					Start
				</button>
				<button onClick={stopTimer} className="button">
					Stop
				</button>
				<button onClick={restartTimer} className="button">
					Restart
				</button>
			</div>
		</div>
	);
};
