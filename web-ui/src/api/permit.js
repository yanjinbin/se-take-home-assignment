import request from "@/utils/http.js";

const apiMap = {
	permit: {
		queryPermits: queryPermits,
	},
};

export default apiMap;

function queryPermits() {
	console.log("queryPermits 开始请求");
	return request({
		url: "/permits",
		method: "get",
	});
}
