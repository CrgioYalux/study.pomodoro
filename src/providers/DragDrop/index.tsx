import { createContext, useContext, useRef, useState, useEffect } from 'react';

interface DragDropContextProps {
	position: {
		x: number;
		y: number;
	};
	backgroundSize: {
		width: number;
		height: number;
	};
}
const DragDropContext = createContext<DragDropContextProps>({
	position: {
		x: 0,
		y: 0,
	},
	backgroundSize: {
		width: 0,
		height: 0,
	},
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
	const containerRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const [backgroundSize, setBackgroundSize] = useState<{
		width: number;
		height: number;
	}>({ width: 1024, height: 768 });

	useEffect(() => {
		if (containerRef.current) {
			const container = containerRef.current as HTMLDivElement;
			setBackgroundSize((prev) => {
				if (
					prev?.width !== container.clientWidth &&
					prev?.height !== container.clientHeight
				) {
					return {
						width: container.clientWidth,
						height: container.clientHeight,
					};
				}
				return prev;
			});
		}
	}, [position]);

	const value = {
		position,
		backgroundSize,
	};

	return (
		<div
			className={classNameBackground}
			ref={containerRef}
			onMouseMove={(e) => {
				setPosition({ x: e.pageX, y: e.pageY });
			}}
		>
			<DragDropContext.Provider value={value}>
				{children}
			</DragDropContext.Provider>
		</div>
	);
};
