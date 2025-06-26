import ThemeButton from "@/pages/context-usage/ThemeButton.jsx";

const ContextUsage = () => {
	return (
		<div>
			<h1>Context Usage</h1>
			<p>
				This page demonstrates how to use context in a React application.
				<br />
				主题切换/登录页 tab 栏切换
			</p>
			<p>
				✅ 总结 步骤 内容 <br />
				1️⃣ createContext 创建一个上下文 <br />
				2️⃣ Context.Provider 提供值给子组件 <br />
				3️⃣ useContext(Context) 获取上下文值 <br />
			</p>
			<ThemeButton />
		</div>
	);
};
export default ContextUsage;
