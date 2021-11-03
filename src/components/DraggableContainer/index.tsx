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
	const { position, backgroundSize } = useDragDrop();
	const [grabbing, setGrabbing] = useState<boolean>(false);

	useEffect(() => {
		if (grabbing) {
			if (index > 100000) {
				index = 0;
			}

			const draggableContainer =
				draggableContainerRef.current as HTMLDivElement;

			const draggableWidth = draggableContainer.clientWidth;
			const draggableHeight = draggableContainer.clientHeight;

			const grabber = grabberRef.current as HTMLDivElement;

			const grabberHeight = grabber.clientHeight;
			const grabberWidth = grabber.clientWidth;

			draggableContainer.style.position = 'absolute';
			draggableContainer.style.zIndex = String(index);

			const moveToTop = position.y - grabberHeight / 2 - 5;
			const moveToLeft = position.x - grabberWidth / 2 - 5;

			if (moveToLeft + draggableWidth < backgroundSize.width) {
				draggableContainer.style.left = moveToLeft + 'px';
			}
			if (moveToTop + draggableHeight < backgroundSize.height) {
				draggableContainer.style.top = moveToTop + 'px';
			}

			index += 1;
		}
	}, [grabbing, position, backgroundSize]);

	return (
		<div
			className={`draggable-container ${classNameContainer}`}
			ref={draggableContainerRef}
			onMouseUp={() => setGrabbing(false)}
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
