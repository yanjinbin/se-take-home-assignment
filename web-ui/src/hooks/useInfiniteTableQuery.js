import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * @param {string} queryKey 查询 key，建议字符串，如 'user-list'
 * @param {Function} fetchFn 请求函数，需支持 page/pageSize 参数
 * @param {Object} defaultParams 初始查询参数
 */
export function useInfiniteTableQuery(queryKey, fetchFn, defaultParams = {}) {
	const {
		data,
		isFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: [queryKey, defaultParams],
		queryFn: ({ pageParam = 1 }) =>
			fetchFn({
				page: pageParam,
				pageSize: 10,
				...defaultParams,
			}),
		getNextPageParam: (lastPage, allPages) => {
			const currentLength = allPages.flatMap((p) => p.list).length;
			if (currentLength < lastPage.total) {
				return allPages.length + 1; // 下一页
			}
			return undefined; // 没有下一页了
		},
		keepPreviousData: true,
	});

	const list = data?.pages.flatMap((page) => page.list) || [];

	return {
		list,
		total: data?.pages?.[0]?.total || 0,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		refetch,
	};
}
