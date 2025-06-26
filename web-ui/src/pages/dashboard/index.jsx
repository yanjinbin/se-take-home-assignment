import { usePermitsQuery } from "@/hooks/usePermitsQuery"; // 导入自定义 hook
import { useUserStore } from "@/store/userStore"; // 导入 store 来获取权限
import { Button, Spin } from "antd"; // 使用 Ant Design 组件
// src/pages/Dashboard.jsx
import React, { useEffect } from "react";

const Dashboard = () => {
	const permissions = useUserStore((state) => state.permissions);

	return (
		<div>
			<h1>欢迎来到仪表盘</h1>
			{/* 在这里可以根据权限来渲染不同的内容 */}
			{permissions.includes("dashboard:view") && (
				<div>
					<h2>仪表盘内容</h2>
					{/* 显示仪表盘内容 */}
				</div>
			)}
			{!permissions.includes("dashboard:view") && (
				<div>
					<p>你没有查看仪表盘的权限。</p>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
