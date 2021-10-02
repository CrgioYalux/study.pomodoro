import { Period, Time } from '../../hooks/useTime/Time';

export type Task = {
	title: string;
	duration: Time;
	period: Period;
	id: string;
};
