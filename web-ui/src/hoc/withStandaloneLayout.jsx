import { useUserStore } from "@/store/userStore.js";
import { Avatar } from "antd"; // 或你的自定义头像组件
import React from "react";

// 高阶组件，使用 children 作为内容
export function withStandaloneLayout({ children }) {
	const { avatarUrl } = useUserStore((state) => {
		state.userInfo;
	});
	const defaultUrl =
		"https://upload.wikimedia.org/wikipedia/zh/thumb/1/16/Zhejiang_University_Logo.svg/1200px-Zhejiang_University_Logo.svg.png";
	return (
		<div className="h-screen flex flex-col bg-white">
			{/* 顶部导航栏，仅右上角头像 */}
			<div className="h-12 px-4 border-b flex items-center justify-end">
				<Avatar
					src={avatarUrl || defaultUrl}
					size="small"
					style={{ backgroundColor: "#87d068" }}
				/>
			</div>

			{/* 主体内容区域 */}
			<div className="flex-1 overflow-auto p-6">{children}</div>
		</div>
	);
}
