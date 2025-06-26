import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import rawPermitRoutes from "@/router/permitRoute.jsx";
import useTabStore from "@/store/tabStore.js"; // 引入 useLocation
import { useUserStore } from "@/store/userStore.js";
import { generateMenuItems } from "@/utils/routeUtils.js";
import { Layout, Menu, Tabs } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatches, useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

// const itemsData = generateMenuItems(rawPermitRoutes);

export default function MainLayout({ permitRoutes }) {
	const itemsData = generateMenuItems(permitRoutes);
	const navigate = useNavigate();
	const { pathname } = useLocation(); // 获取当前 location 信息
	const matches = useMatches();
	const [openKeys, setOpenKeys] = useState([]); // 管理展开的菜单项
	const uid = useUserStore((s) => s.userInfo.uid); // 1. 获取 uid
	const { tabs, activeKey, addTab, removeTab, setActiveKey } =
		useTabStore(uid)();

	// 这里是关键 path 转成  tabs 的逻辑
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const current = matches.at(-1);
		console.log("current", JSON.stringify(current));
		if (!current?.pathname || !current.handle?.title) return;

		// 检查是否已存在
		const exists = tabs.find((tab) => tab.key === current.pathname);
		if (!exists) {
			addTab({
				key: current.pathname,
				title: current.handle.title,
				path: current.pathname,
			});
		}
		setActiveKey(current.pathname); // 同步激活标签页

		// 通过判断路径来决定需要展开的菜单项
		const findOpenKeys = (key) => {
			const parentKey = key.split("/")[1]; // 获取父菜单的 key
			return [parentKey]; // 展开父菜单
		};

		// 根据 pathname 自动更新 openKeys
		const newOpenKeys = itemsData
			.filter((item) => pathname.includes(item.key)) // 查找路径包含的菜单
			.flatMap((item) => findOpenKeys(item.key)); // 把多维数组扁平化成一维数组
		console.log(
			"pathName",
			pathname,
			"newOpenKeys",
			JSON.stringify(newOpenKeys),
		);
		setOpenKeys(newOpenKeys); // 设置 openKeys，自动展开菜单
	}, [pathname, matches]);

	return (
		<Layout style={{ height: "100vh" }}>
			<Sider width={200}>
				<Menu
					theme="dark"
					mode="inline"
					openKeys={openKeys} // 使用 openKeys 来展开菜单
					onOpenChange={(keys) => setOpenKeys(keys)} // 监听菜单展开变化
					items={itemsData}
					selectedKeys={[activeKey]}
					onClick={({ key }) => navigate(key)}
					style={{ height: "100%", borderRight: 0 }} // 确保 Menu 填满 Sider 高度
				/>
			</Sider>
			<Layout style={{ display: "flex", flexDirection: "column" }}>
				<Header
					style={{
						color: "#ac2626",
						background: "#001529", // 或其他颜色，如 '#fff' 配深色文字
						padding: "0 16px", // 调整内边距
					}}
				>
					后台管理系统
				</Header>

				<Tabs
					type={"editable-card"}
					hideAdd
					activeKey={activeKey}
					onEdit={(targetKey, action) => {
						if (action === "remove") {
							removeTab(targetKey);
						}
					}}
					onChange={(key) => {
						setActiveKey(key);
						navigate(key);
					}}
					//tabs = [{ key: "/dashboard", title: "首页", path: "/dashboard" }]
					// convert to items

					items={tabs.map((tab) => ({
						key: tab.key,
						label: tab.title,
						closable: tab.key !== "/dashboard", // 首页不可关闭
					}))}
				/>
				<Breadcrumbs />
				<Content
					style={{
						padding: 16,
						margin: 0, // 通常不需要外边距
						flex: 1, // 让 Content 填充 Header 下方的剩余垂直空间
						overflow: "auto", // 当内容超出时，Content 内部出现滚动条
						background: "#f0f2f5", // 经典的浅灰色背景
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
