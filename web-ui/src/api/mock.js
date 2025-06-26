import request from "@/utils/http.js";

const mockApi = {
	mock: {
		fetchUsers: fetchUsers,
	},
};

export default mockApi;

/**
 * 获取用户列表
 * @param {Object} params - 查询参数，如 { name, age, address, page_no, page_size, sortField, sortOrder }
 */
function fetchUsers(
	params = {
		page_no: 1,
		page_size: 10,
	},
) {
	console.log("fetchUsers 请求参数：", params);
	return request({
		url: "/users",
		method: "get",
		params, // axios 会自动序列化为 ?key=value&...
	});
}
