import './Timer.scss';
import { useTimerUtil } from '../../providers/TimerUtil';
import { formatTime } from '../../hooks/useTime/Time';
import { DraggableContainer } from '../DraggableContainer';

export const Timer = () => {
	const { startTimer, stopTimer, restartTimer, time } = useTimerUtil();

	return (
		<DraggableContainer classNameContainer="Timer-container">
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
		</DraggableContainer>
	);
};
