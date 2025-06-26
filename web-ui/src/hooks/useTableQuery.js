import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useTableQuery(queryKey, fetchFn, defaultParams = {}) {
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 10,
	});

	const { data, isLoading, refetch, isFetching } = useQuery({
		queryKey: [queryKey, pagination, defaultParams],
		queryFn: () =>
			fetchFn({
				page: pagination.page,
				pageSize: pagination.pageSize,
				...defaultParams,
			}),
		keepPreviousData: true,
	});

	const onPageChange = (page, pageSize) => {
		setPagination((prev) => ({ ...prev, page, pageSize }));
	};

	return {
		dataSource: data?.list || [],
		total: data?.total || 0,
		loading: isLoading || isFetching,
		pagination: {
			current: pagination.page,
			pageSize: pagination.pageSize,
			total: data?.total || 0,
			onChange: onPageChange,
		},
		refetch,
	};
}
