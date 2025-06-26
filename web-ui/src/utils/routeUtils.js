// src/utils/routeUtils.js
import { matchPath } from "react-router-dom";

/**
 * 根据权限过滤路由（用于菜单、动态路由）
 */
export function filterRoutesByPermission(routes, permissions = []) {
	return routes
		.map((route) => {
			const required = route.permission;
			const hasPermission = !required || permissions.includes(required);

			if (!hasPermission) return null;

			const filteredChildren = route.children
				? filterRoutesByPermission(route.children, permissions)
				: undefined;

			return {
				...route,
				children: filteredChildren,
			};
		})
		.filter(Boolean);
}

export function generateMenuItems(routes, parentPath = "") {
	return routes.map((route) => {
		const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, "/");
		const item = {
			key: fullPath,
			label: route.handle?.title || fullPath,
		};
		if (route.children?.length) {
			item.children = generateMenuItems(route.children, fullPath);
		}
		return item;
	});
}

export function addRouteIds(routes, parentId = "") {
	return routes.map((route) => {
		const currentId = parentId ? `${parentId}-${route.path}` : route.path;

		const newRoute = {
			...route,
			id: route.id || currentId, // 如果用户没设置 id，我们生成一个
		};

		if (route.children?.length) {
			newRoute.children = addRouteIds(route.children, newRoute.id);
		}

		return newRoute;
	});
}

// 扁平化菜单
export const flattenMenus = (menus) => {
	const result = [];
	const flatten = (menuList) => {
		//  //  不保留 children 做法
		//       const { children, ...rest } = item;
		//       result.push(rest); // Push the current item (without children)
		//       if (children) {
		//         flatten(children); // Recursively flatten the children
		//       }
		for (const menu of menuList) {
			result.push(menu);

			if (menu.children) {
				flatten(menu.children);
			}
		}
	};
	flatten(menus);
	return result;
};

// 匹配当前路径对应的菜单项
export const findMenuByKey = (pathName, menus) => {
	// 扁平化菜单并查找匹配项
	return flattenMenus(menus).find((menu) => {
		console.log("Checking menu:", menu.key); // 打印当前正在检查的菜单路径
		console.log("Path to match:", pathName); // 打印当前的路径名称

		// 使用 matchPath 进行匹配，注意传入的参数
		const match = matchPath({ path: menu.key, end: false }, pathName);
		console.log("Match result:", match); // 打印匹配结果
		return match;
	});
};
