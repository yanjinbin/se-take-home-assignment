import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { message } from "antd";
import React, { useState } from "react";

export function User() {
	const [phone] = useState("138-0000-0000");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [smsCode, setSmsCode] = useState("");
	const [codeSent, setCodeSent] = useState(false);

	const handleSendCode = () => {
		// 你可以在这里调用实际的发送短信接口
		setCodeSent(true);
		setTimeout(() => setCodeSent(false), 60000); // 60秒后可重新发送
		message.success(`验证码已发送至：${phone}`);
	};

	const handleSubmit = () => {
		if (!oldPassword || !newPassword || !confirmPassword || !smsCode) {
			alert("请填写所有字段");
			return;
		}
		if (newPassword !== confirmPassword) {
			alert("新密码与确认密码不一致");
			return;
		}
		// 在这里处理实际的提交逻辑
		alert("密码修改成功");
	};

	return (
		<main className="max-w-screen-md w-full  mx-auto  flex items-center justify-start min-h-screen bg-gray-100 p-6">
			<Card className="w-full max-w-lg shadow-xl">
				<CardHeader>
					<CardTitle className="text-blue-500">个人信息</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6 text-sm text-gray-700">
					{/* 个人信息部分 */}
					<div className="space-y-2">
						<div>
							<span className="font-medium text-gray-500">姓名：</span>张三
						</div>
						<div>
							<span className="font-medium text-gray-500">部门：</span>技术部
						</div>
						<div>
							<span className="font-medium text-gray-500">手机号：</span>
							{phone}
						</div>
						<div>
							<span className="font-medium text-gray-500">联系地址：</span>
							北京市朝阳区科技路88号
						</div>
					</div>

					<hr className="border-gray-200" />

					{/* 修改密码部分 */}
					<div className="space-y-4">
						<div>
							<Label>旧密码</Label>
							<Input
								type="password"
								placeholder="请输入旧密码"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
						</div>
						<div>
							<Label>新密码</Label>
							<Input
								type="password"
								placeholder="请输入新密码"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						<div>
							<Label>确认新密码</Label>
							<Input
								type="password"
								placeholder="请再次输入新密码"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
					</div>

					{/* 短信验证码部分 */}
					<div className="space-y-2">
						<Label>短信验证码</Label>
						<div className="flex gap-2">
							<Input
								placeholder="输入验证码"
								value={smsCode}
								onChange={(e) => setSmsCode(e.target.value)}
							/>
							<Button
								variant="outline"
								onClick={handleSendCode}
								disabled={codeSent}
							>
								{codeSent ? "60秒后重试" : "获取验证码"}
							</Button>
						</div>
					</div>

					{/* 提交按钮 */}
					<div className="pt-4">
						<Button className="w-full text-blue-500" onClick={handleSubmit}>
							修改密码
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
