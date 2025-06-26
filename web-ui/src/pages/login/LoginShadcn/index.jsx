"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

export default function LoginShadcn() {
	const [form, setForm] = useState({});

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = () => {
		alert(JSON.stringify(form, null, 2));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-500 px-4">
			<div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8">
				<h2 className="text-2xl font-semibold text-center mb-6">欢迎登录</h2>

				<Tabs.Root defaultValue="username" className="w-full">
					<Tabs.List className="flex mb-6 border-b border-gray-300 select-none">
						{["username", "phone"].map((key) => (
							<Tabs.Trigger
								key={key}
								value={key}
								className={cn(
									"flex-1 py-3 text-center font-semibold cursor-pointer relative transition-all duration-300",
									"text-gray-500 hover:text-indigo-600",
									"data-[state=active]:text-indigo-700 data-[state=active]:shadow-lg data-[state=active]:rounded-t-xl data-[state=active]:bg-indigo-50",
									"data-[state=active]:border-b-4 data-[state=active]:border-indigo-600",
								)}
							>
								{key === "username" ? "用户名登录" : "手机号登录"}
								{/* 底部小滑块 */}
								<span
									className={cn(
										"absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-indigo-600 transition-opacity duration-300",
										"data-[state=active]:opacity-100",
										"opacity-0",
									)}
								/>
							</Tabs.Trigger>
						))}
					</Tabs.List>

					<Tabs.Content
						value="username"
						className="space-y-4 animate-fadeIn"
						style={{ animationDuration: "0.2s" }}
					>
						<div>
							<Label htmlFor="username">用户名</Label>
							<Input
								name="username"
								onChange={handleChange}
								placeholder="请输入用户名"
							/>
						</div>
						<div>
							<Label htmlFor="password">密码</Label>
							<Input
								type="password"
								name="password"
								onChange={handleChange}
								placeholder="请输入密码"
							/>
						</div>
						<Button
							className="w-full mt-2 text-blue-950"
							onClick={handleSubmit}
						>
							登录
						</Button>
					</Tabs.Content>

					<Tabs.Content
						value="phone"
						className="space-y-4 animate-fadeIn"
						style={{ animationDuration: "0.3s" }}
					>
						<div>
							<Label htmlFor="phone">手机号</Label>
							<Input
								name="phone"
								onChange={handleChange}
								placeholder="请输入手机号"
							/>
						</div>
						<div>
							<Label htmlFor="code">验证码</Label>
							<Input
								name="code"
								onChange={handleChange}
								placeholder="请输入验证码"
							/>
						</div>
						<Button className="w-full mt-2 text-red-400" onClick={handleSubmit}>
							登录
						</Button>
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	);
}
