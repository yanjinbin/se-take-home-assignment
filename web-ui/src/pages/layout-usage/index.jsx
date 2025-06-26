const LayoutUsage = () => {
	return (
		<>
			<div className="flex flex-col w-full">
				<div className="w-full bg-blue-200">{"组件 A 内容"}</div>
				<div className="w-full bg-green-200">{"组件 B 内容 "}</div>
			</div>
			<div className="grid debug-border-blue col-span-full w-full">
				<div className=" bg-red-200">{"组件 C 内容"}</div>
				<div className=" bg-pink-200">{"组件 D 内容"}</div>
				<div className=" bg-pink-200">{"组件 E 内容"}</div>
			</div>
		</>
	);
};

export default LayoutUsage;
