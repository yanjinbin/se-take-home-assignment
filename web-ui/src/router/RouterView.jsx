import { withGuards } from "@/hoc/withGuards.jsx";
import { usePermitsQuery } from "@/hooks/usePermitsQuery.js";
import MainLayout from "@/layout/Mainlayout.jsx";
import NotFound from "@/pages/error-pages/404/index.jsx";
import rawPermitRoutes from "@/router/permitRoute.jsx";
import rawStaticRoutes from "@/router/staticRoute.jsx";
import { useUserStore } from "@/store/userStore";
import { filterRoutesByPermission } from "@/utils/routeUtils.js";
import { Spin } from "antd";

/*
import { RouterProvider, createBrowserRouter } from "react-router-dom";


export default function AppRouter() {
	const { isLoading, permissions } = usePermitsQuery(); // ⬅️ 关键点

	if (isLoading) {
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spin tip="正在加载权限..." size="large" />
			</div>
		);
	}

	// 包装权限路由
	const filteredRoutes = filterRoutesByPermission(rawPermitRoutes, permissions);
	const permitRoutes = withGuards(filteredRoutes, permissions);

	// 构造完整路由
	const router = createBrowserRouter([
		...rawStaticRoutes,
		{
			path: "/",
			element: <MainLayout permitRoutes={permitRoutes} />,
			children: permitRoutes,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return <RouterProvider router={router} />;
}
*/

// Import the generated route tree
import { routeTree } from "@/routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TanStackRouterDevtoolsInProd } from "@tanstack/react-router-devtools";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

export default function AppRouter() {
	const { isLoading, permissions } = usePermitsQuery(); // ⬅️ 关键点

	if (isLoading) {
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spin tip="正在加载权限..." size="large" />
			</div>
		);
	}

	const router = createRouter({
		routeTree,
		context: {
			permissions,
			user: { id: "u123" },
		},
		defaultPreload: "intent",
	});
	return <RouterProvider router={router} />;
}
