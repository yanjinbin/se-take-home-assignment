import apiMap from "@/api/permit.js";
import { t } from "@/locales/index.js";
import { useUserStore } from "@/store/userStore";
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { message } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 用于获取权限数据，仅处理状态设置与数据拉取，不包含跳转逻辑。
 */
export function usePermitsQuery() {
	const setPermissions = useUserStore((state) => state.setPermissions);
	const {
		isLoading,
		isError,
		data: res,
		error,
		isFetching,
	} = useQuery({
		queryKey: ["permissions"],
		queryFn: () => apiMap.permit.queryPermits(),
		staleTime: 60 * 60 * 1000, // 缓存 5 分钟
		placeholderData: keepPreviousData,
	});

	// 设置权限状态（数据有效才设置）
	useEffect(() => {
		if (!isFetching && res?.status === 200 && Array.isArray(res.data?.data)) {
			setPermissions(res.data.data);
		}
	}, [isFetching, res, setPermissions]);

	const permissions = res?.data?.data;

	// 暴露信息，供调用方根据情况自行处理跳转或展示逻辑
	return {
		isLoading,
		isError,
		error,
		isFetching,
		permissions,
		statusCode: res?.status ?? null,
		isEmpty: !res?.data?.data || res.data.data.length === 0,
	};
}

// 手动刷新权限的 Hook
export function useRefreshPermits() {
	const queryClient = useQueryClient();

	const refreshPermits = async () => {
		await queryClient.invalidateQueries({ queryKey: ["permissions"] });
	};

	return refreshPermits;
}
