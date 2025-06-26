import request from "@/utils/http.js";

const apiMap = {
	sms: {
		sendSMS: sendSMS,
		verifySMS: verifySMS,
	},
};

export default apiMap;

/**
 * 发送短信验证码
 * phone
 * @param params
 * @returns {*}
 */
function sendSMS(params) {
	console.log("loginBySMS 开始请求");
	return request({
		url: "/sms/send",
		method: "post",
		data: params,
	});
}

/**
 * 验证短信验证码
 * phone code
 * @param params
 * @returns {*}
 */
function verifySMS(params) {
	console.log("verifySMS 开始请求");
	return request({
		url: "/sms/verify",
		method: "post",
		data: params,
	});
}
