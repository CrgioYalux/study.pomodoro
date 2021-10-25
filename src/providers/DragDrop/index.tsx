import { createContext, useContext, useRef, useState } from 'react';

interface DragDropContextProps {
	position: {
		x: number;
		y: number;
	};
	moving: boolean;
}
const DragDropContext = createContext<DragDropContextProps>({
	position: {
		x: 0,
		y: 0,
	},
	moving: false,
});

export const useDragDrop = () => useContext(DragDropContext);

interface DragDropProviderProps {
	children: React.ReactNode;
	classNameBackground?: string;
}
export const DragDropProvider = ({
	children,
	classNameBackground,
}: DragDropProviderProps) => {
	const containerRef = useRef(null);
	const [moving, setMoving] = useState<boolean>(false);
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	const value = {
		position,
		moving,
	};

	return (
		<div
			className={classNameBackground}
			ref={containerRef}
			onMouseDown={(e) => {
				setMoving(true);
				setPosition({ x: e.pageX, y: e.pageY });
			}}
			onMouseUp={(e) => {
				setMoving(false);
			}}
			onMouseMove={(e) => {
				if (moving) {
					setPosition({ x: e.pageX, y: e.pageY });
				}
			}}
		>
			<DragDropContext.Provider value={value}>
				{children}
			</DragDropContext.Provider>
		</div>
	);
};
