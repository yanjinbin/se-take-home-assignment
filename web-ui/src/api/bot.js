import request from "@/utils/http";

// Bot  API
export const fetchBots = () => {
	return request({
		url: "/bots",
		method: "get",
	});
};

export const addBot = (data) => {
	return request({
		url: "/bots",
		method: "post",
		data,
	});
};

export const deleteBot = (id) => {
	return request({
		url: `/bots/${id}`,
		method: "delete",
	});
};

// Order API
export const fetchOrders = () => {
	return request({
		url: "/orders",
		method: "get",
	});
};

export const createOrder = (data) => {
	return request({
		url: "/orders",
		method: "post",
		data,
	});
};

const api = {
	bots: {
		fetch: fetchBots,
		add: addBot,
		delete: deleteBot,
	},
	orders: {
		fetch: fetchOrders,
		create: createOrder,
	},
};

export default api;
