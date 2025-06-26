import { usePermitsQuery } from "@/hooks/usePermitsQuery.js";
import router from "@/router/RouterView.jsx";
import AppRouter from "@/router/RouterView.jsx";
import { Spin } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import { RouterProvider, useLocation } from "react-router-dom";

const App = () => {
	return (
		<>
			<Helmet>
				<title>ReactActionBoilerplate</title>
			</Helmet>
			<ErrorBoundary
				FallbackComponent={({ error }) => (
					<div role="alert" style={{ padding: 20, color: "red" }}>
						<h2>🚨 页面出错啦！</h2>
						<p>{error.message}</p>
					</div>
				)}
				onError={(error, info) => {
					console.error("❌ 捕获运行时错误：", error);
					console.error("🔍 组件堆栈：", info?.componentStack);
				}}
			>
				<AppRouter />
			</ErrorBoundary>
		</>
	);
};

export default App;
