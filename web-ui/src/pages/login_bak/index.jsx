import apiMap from "@/api/login.js";
import { useUserStore } from "@/store/userStore.js";
import { getAK, setAK } from "@/utils/auth.js";
import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [isSMSLogin, setIsSMSLogin] = useState(true); // 切换登录方式
	const [captcha, setCaptcha] = useState("");
	const [captchaValid, setCaptchaValid] = useState(false);
	const setUserInfo = useUserStore((state) => state.setUserInfo);

	useEffect(() => {
		const token = getAK();
		if (token) {
			// 已经登录，跳转到首页
			navigate("/dashboard", { replace: true });
		}
	}, [navigate]);
	const handleCaptchaSubmit = async () => {
		const res = await apiMap.login.sendCaptcha({ captcha });
		if (res?.status === 200) {
			setCaptchaValid(true);
			message.success("验证码正确");
		} else {
			setCaptchaValid(false);
			message.error("验证码错误");
		}
	};

	const handleLogin = async (values) => {
		let loginRes;
		if (isSMSLogin) {
			if (!captchaValid) {
				message.error("请先验证验证码");
				return;
			}
			loginRes = await apiMap.login.loginBySMS(values);
		} else {
			loginRes = await apiMap.login.loginByPassword(values);
		}
		if (loginRes?.status === 200) {
			// 登录成功，保存 JWT token
			console.log("登录成功：", loginRes.data?.data);
			setAK(loginRes.data?.data?.token);
			// set user info
			setUserInfo(loginRes.data?.data?.userInfo);
			message.success("登录成功");
			// 跳转首页或其他逻辑
			navigate("/dashboard", { replace: true });
		} else {
			message.error("登录失败");
		}
	};

	return (
		<div>
			<Form form={form} onFinish={handleLogin}>
				<Form.Item
					name="phone"
					rules={[{ required: true, message: "请输入手机号" }]}
				>
					<Input placeholder="手机号" />
				</Form.Item>

				{isSMSLogin && (
					<>
						<Form.Item
							name="captcha"
							rules={[{ required: true, message: "请输入验证码" }]}
						>
							<Input
								placeholder="验证码"
								onChange={(e) => setCaptcha(e.target.value)}
								maxLength={4}
							/>
							<Button onClick={handleCaptchaSubmit}>发送验证码</Button>
						</Form.Item>
						<Form.Item
							name="code"
							rules={[{ required: true, message: "请输入短信验证码" }]}
						>
							<Input placeholder="短信验证码" />
						</Form.Item>
					</>
				)}

				{!isSMSLogin && (
					<Form.Item
						name="password"
						rules={[{ required: true, message: "请输入密码" }]}
					>
						<Input.Password placeholder="密码" />
					</Form.Item>
				)}

				<Button type="primary" htmlType="submit">
					登录
				</Button>

				<Button type="link" onClick={() => setIsSMSLogin(!isSMSLogin)}>
					切换到{isSMSLogin ? "密码登录" : "短信登录"}
				</Button>
			</Form>
		</div>
	);
};

export default LoginPage;
