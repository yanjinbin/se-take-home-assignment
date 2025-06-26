import rawPermitRoutes from "@/router/permitRoute.jsx"; // route path => breadcrumb name 映射
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useBreadcrumbs() {
	const location = useLocation();
	return useMemo(() => {
		const paths = location.pathname.split("/").filter(Boolean);
		return paths.map((_, i) => {
			const fullPath = `/${paths.slice(0, i + 1).join("/")}`;
			return { path: fullPath, name: rawPermitRoutes[fullPath] || "未知路径" };
		});
	}, [location.pathname]);
}
