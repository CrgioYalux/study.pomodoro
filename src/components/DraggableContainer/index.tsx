import './DraggableContainer.scss';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { useDragDrop } from '../../providers/DragDrop';

interface DraggableContainerProps {
	children: ReactNode;
	classNameContainer?: string;
	classNameGrabber?: string;
}

let index = 0;

export const DraggableContainer = ({
	children,
	classNameContainer,
	classNameGrabber,
}: DraggableContainerProps) => {
	const draggableContainerRef = useRef<HTMLDivElement>(null);
	const grabberRef = useRef<HTMLDivElement>(null);
	const { moving, position } = useDragDrop();
	const [grabbing, setGrabbing] = useState<boolean>(false);

	useEffect(() => {
		if (moving && grabbing) {
			if (index > 100000) {
				index = 0;
			}

			const draggableContainer =
				draggableContainerRef.current as HTMLDivElement;
			const grabber = grabberRef.current as HTMLDivElement;

			const height = grabber.clientHeight;
			const width = grabber.clientWidth;

			draggableContainer.style.position = 'absolute';
			draggableContainer.style.zIndex = String(index);
			draggableContainer.style.top = position.y - width / 2 - 5 + 'px';
			draggableContainer.style.left = position.x - height / 2 - 5 + 'px';

			index += 1;
		}
	}, [moving, grabbing, position]);

	return (
		<div
			className={`draggable-container ${classNameContainer}`}
			style={{ position: 'relative' }}
			ref={draggableContainerRef}
		>
			<div
				ref={grabberRef}
				onMouseDown={() => {
					setGrabbing(true);
				}}
				onMouseUp={() => setGrabbing(false)}
				className={`grabber ${classNameGrabber}`}
			>
				#
			</div>
			{children}
		</div>
	);
};
