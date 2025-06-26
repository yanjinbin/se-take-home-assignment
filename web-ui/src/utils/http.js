import { logout } from "@/utils/logout.js";
import { notification } from "antd";
import Axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { getAK, rmAK, setAK } from "./auth.js";

// 只给ak, 过期了就重新登陆, ak 有效期设置15天
const WhiteList = [
	"/login/password", // 手机号+密码登录
	"/login/sms", //短信登录
];

// kebab 和 camel 转换
const instance = applyCaseMiddleware(
	Axios.create({
		baseURL: import.meta.env.VITE_HTTP_BASE_URL,
		timeout: import.meta.env.VITE_HTTP_TIMEOUT,
		headers: { "Content-Type": "application/json;charset=utf-8" },
	}),
);

// 添加请求拦截器
instance.interceptors.request.use(
	(config) => {
		if (config.url && typeof config.url === "string") {
			if (!WhiteList.includes(config.url)) {
				const Token = getAK();
				if (Token && Token.length > 0 && config.headers) {
					config.headers.Authorization = Token;
				}
			}
		}
		return config;
	},
	(error) => {
		notification.error(error);
		return Promise.reject(error);
	},
);

// 响应拦截器
instance.interceptors.response.use(
	(response) => {
		if (response.config.url && WhiteList.includes(response.config.url)) {
			if (response.data?.data?.token) {
				const newToken = response.data.data.token; // 假设登录接口返回 token
				setAK(newToken); // 保存新的 token
			}
		}
		return response;
	},
	(error) => {
		handleError(error); // 调用通用的错误处理函数
		return Promise.reject(error); // 返回 rejected 错误，继续其他处理
	},
);

// 自定义处理错误的函数
const handleError = (error) => {
	if (!error.response) {
		// 处理没有响应的错误（如网络错误）
		notification.error({
			message: "网络错误,请检查您的网络是否正常连接哦",
			description: error.message,
		});
		return;
	}

	const { status, data } = error.response;
	switch (status) {
		case 401: {
			// 处理 401 错误 - 用户未授权
			// notification.error({
			// 	message: "重新登录",
			// 	description: "您的会话已过期，请重新登录。",
			// });
			// window.location = "/login";
			// rmAK();
			logout("您的会话已过期，请重新登录。");
			break;
		}
		case 403:
			// 处理 403 错误 - 禁止访问
			notification.error({
				message: "禁止访问",
				description: "您没有权限访问",
			});
			break;

		case 500:
			// 处理 500 错误 - 服务器内部错误
			notification.error({
				message: "服务器错误",
				description: "服务器出现错误，请稍后再试。",
			});
			break;

		default:
			// 处理其他错误
			notification.error({
				message: `错误 ${status}`,
				description: data.message || "请求失败，请稍后再试。",
			});
	}
};

function formatErrorResponse(response) {
	// 使用 message 作为简要信息
	let formattedMessage = response.message;

	// 拼接 errors 数组中的详细错误信息
	if (response.errors && response.errors.length > 0) {
		const errorDetails = response.errors
			.map((error) => {
				// 拼接 field 和 error（例如 "email: 邮箱格式无效"）
				return `${error.field}: ${error.error}`;
			})
			.join("; ");

		// 在简要信息后拼接详细错误
		formattedMessage += ` (详情: ${errorDetails})`;
	}

	return formattedMessage;
}

// 示例数据
const response = {
	code: 1001,
	data: null,
	message: "请求失败",
	trace_id: "abc123",
	errors: [
		{
			field: "email",
			error: "邮箱格式无效",
		},
		{
			field: "password",
			error: "密码长度不足",
		},
	],
};

// 格式化错误信息
const formattedError = formatErrorResponse(response);
console.log(formattedError); // 输出: "请求失败 (详情: email: 邮箱格式无效; password: 密码长度不足)"

export default instance;
