import request from "@/utils/http.js";

const apiMap = {
	login: {
		loginBySMS: loginBySMS,
		sendCaptcha: sendCaptcha,
		loginByPassword: loginByPassword,
	},
};

export default apiMap;
function sendCaptcha(params) {
	console.log("sendCaptcha 开始请求");
	return request({
		url: "/login/captcha",
		method: "post",
		data: params,
	});
}
function loginBySMS(params) {
	console.log("loginBySMS 开始请求");
	return request({
		url: "/login/sms",
		method: "post",
		data: params,
	});
}

function loginByPassword(params) {
	console.log("loginByPassword 开始请求");
	return request({
		url: "/login/password",
		method: "post",
		data: params,
	});
}
