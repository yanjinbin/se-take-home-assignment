import * as motion from "motion/react-client";

export function Rotate() {
	return (
		<motion.div
			className={"w-[200px] h-[200px] bg-amber-400 rounded-[5px]"}
			animate={{ rotate: 360 }}
			transition={{ duration: 1 }}
		/>
	);
}

const MotionUsage = () => {
	return (
		<>
			<div className={"flex justify-center items-center h-screen"}>
				<Rotate />
			</div>
		</>
	);
};

export default MotionUsage;
