import {
	LockOutlined,
	MailOutlined,
	MobileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Tabs, Typography } from "antd";
import { useState } from "react";
import { FaSms } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoPhonePortrait } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

// const { Title } = Typography;

export default function LoginAntd() {
	const [activeKey, setActiveKey] = useState("phone");

	const handlePhoneLogin = (values) => {
		console.log("Phone Login Info:", values);
		alert(JSON.stringify({ type: "phone", ...values }));
	};

	const handleUsernameLogin = (values) => {
		console.log("Username Login Info:", values);
		alert(JSON.stringify({ type: "username", ...values }));
	};

	return (
		// className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-800"
		<div>
			<div className="w-[400px] bg-white rounded-2xl shadow-xl p-8">
				{/*// className="text-center mb-6"*/}
				{/*<Title level={3}>欢迎登录口腔管理系统</Title>*/}
				<Tabs
					className="text-center mb-6"
					activeKey={activeKey}
					onChange={setActiveKey}
					centered
					size="large"
					items={[
						{
							key: "phone",
							label: "手机号登录",
							children: (
								<Form layout="vertical" onFinish={handlePhoneLogin}>
									<Form.Item
										name="phone"
										label="手机号"
										rules={[{ required: true, message: "请输入手机号" }]}
									>
										<Input
											prefix={<IoPhonePortrait />}
											placeholder="请输入手机号"
										/>
									</Form.Item>
									<Form.Item
										name="code"
										label="验证码"
										rules={[{ required: true, message: "请输入验证码" }]}
									>
										<Input prefix={<FaSms />} placeholder="请输入验证码" />
									</Form.Item>
									<Button type="primary" htmlType="submit" block>
										登录
									</Button>
								</Form>
							),
						},
						{
							key: "username",
							label: "用户名登录",
							children: (
								<Form layout="vertical" onFinish={handleUsernameLogin}>
									<Form.Item
										name="username"
										label="用户名"
										rules={[{ required: true, message: "请输入用户名" }]}
									>
										<Input
											prefix={<FaRegCircleUser />}
											placeholder="请输入用户名"
										/>
									</Form.Item>
									<Form.Item
										name="password"
										label="密码"
										rules={[{ required: true, message: "请输入密码" }]}
									>
										<Input.Password
											prefix={<RiLockPasswordLine />}
											placeholder="请输入密码"
										/>
									</Form.Item>
									<Button type="primary" htmlType="submit" block>
										登录
									</Button>
								</Form>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
