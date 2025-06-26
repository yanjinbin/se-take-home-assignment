import WaveProgress from "@/pages/animation-usage/WaveProgress.jsx";
import { useEffect, useState } from "react";
// 模拟进度获取函数
export async function getProgress() {
	// 这里可以是接口调用，也可以是本地模拟
	await new Promise((res) => setTimeout(res, 200)); // 模拟网络延迟
	const progress = Math.min(Math.floor(Math.random() * 110), 100); // 随机进度，最大100
	return progress;
}

export const handleComplete = () => {
	alert("加载完成！你可以执行后续动作了");
};

export function ProgressLoader({ getProgress, onComplete }) {
	const [percent, setPercent] = useState(0);
	const [status, setStatus] = useState("loading"); // 'loading' | 'error' | 'success'
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (status !== "loading") return;

		const interval = setInterval(async () => {
			try {
				const p = await getProgress();
				setPercent(p);
				if (p >= 100) {
					setStatus("success");
					clearInterval(interval);
					if (onComplete) onComplete();
				}
			} catch (err) {
				setErrorMsg(err.message || "加载失败");
				setStatus("error");
				clearInterval(interval);
			}
		}, 300); // 300ms间隔刷新

		return () => clearInterval(interval);
	}, [status, getProgress, onComplete]);

	if (status === "error") {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<svg
					className="w-24 h-24 mb-4 text-red-600"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<circle
						cx="12"
						cy="12"
						r="10"
						stroke="red"
						strokeWidth="2"
						fill="none"
					/>
					<line x1="15" y1="9" x2="9" y2="15" stroke="red" strokeWidth="2" />
					<line x1="9" y1="9" x2="15" y2="15" stroke="red" strokeWidth="2" />
				</svg>

				<p className="text-red-600 text-lg">{errorMsg}</p>
			</div>
		);
	}

	if (status === "success") {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-green-600">
				<svg
					className="w-16 h-16 mb-4"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<p className="text-xl font-semibold">加载完成！</p>
			</div>
		);
	}

	// loading 状态
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<WaveProgress percent={percent} />
		</div>
	);
}

/*import React, { useEffect, useState } from "react";
import WaveProgress from "./WaveProgress"; // 你之前写好的水波组件

function ProgressLoader({ getProgress }) {
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		let interval = null;

		const fetchProgress = async () => {
			try {
				const value = await getProgress();
				setPercent(value);

				if (value >= 100 && interval) {
					clearInterval(interval);
				}
			} catch (err) {
				console.error("获取进度失败", err);
				clearInterval(interval);
			}
		};

		// 每秒轮询进度
		interval = setInterval(fetchProgress, 1000);

		// 立即拉一次
		fetchProgress();

		return () => clearInterval(interval);
	}, [getProgress]);

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<WaveProgress percent={percent} />
		</div>
	);
}

export default ProgressLoader;*/

/*
import React, { useState, useEffect } from "react";
import WaveProgress from "./WaveProgress.jsx"; // 假设你已完成 WaveProgress 组件

function LoadingProgress() {
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setPercent((prev) => {
				if (prev >= 100) {
					clearInterval(timer);
					return 100;
				}
				return prev + 1;
			});
		}, 50); // 每 50ms 增加 1%

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<WaveProgress percent={percent} size={200} />
		</div>
	);
}

export default LoadingProgress;
*/
