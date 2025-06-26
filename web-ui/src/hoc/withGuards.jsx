import AuthGuard from "@/hoc/AuthGuard.jsx";
import PermissionGuard from "@/hoc/PermissionGuard.jsx";
import { withOutlet } from "@/hoc/withOutlet.jsx";
import { useUserStore } from "@/store/userStore.js";
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * 给每个路由自动加上 AuthGuard 和 PermissionGuard。
 * 如果存在 children，则自动包一层 <Outlet />。
 */
export function withGuards(routes, permissions) {
	console.log("permissions", permissions);

	return routes.map((route) => {
		const newRoute = { ...route };

		// 包裹权限和登录守卫
		newRoute.element = (
			<AuthGuard>
				<PermissionGuard
					permissions={permissions}
					permission={route.permission}
				>
					{route.element}
				</PermissionGuard>
			</AuthGuard>
		);

		// 递归处理 children
		if (route.children) {
			newRoute.children = withGuards(route.children, permissions);
		}

		return newRoute;
	});
}
