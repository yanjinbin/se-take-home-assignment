// src/router/PermissionGuard.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function PermissionGuard({ permissions, permission, children }) {
	// const permissions = useUserStore((state) => state.permits);
	// 如果 permissions 不是数组，默认赋值为空数组
	const validPermissions = Array.isArray(permissions) ? permissions : [];
	//	const location = useLocation();

	if (!validPermissions.includes(permission)) {
		console.log("PermissionGuard：无权限", permission, permissions);
		// 	return <Navigate to="/403" replace state={{ from: location }} />;
		// return null; // 不渲染任何东西
		return <div>{"你无权限查看"}</div>;
	}

	return children;
}
