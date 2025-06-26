import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
	// 检查 localStorage 中是否有用户设置，如果没有则使用系统的默认设置
	const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
	const systemPrefersDark = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	const [darkMode, setDarkMode] = useState(savedDarkMode ?? systemPrefersDark);

	// 切换暗黑模式
	const toggleDarkMode = () => {
		setDarkMode((prevState) => !prevState);
	};

	// 使用 useEffect 在组件加载时根据 darkMode 设置更新 body 的类
	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}

		// 将用户的暗黑模式设置保存到 localStorage
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	// 监听系统主题变化，并自动更新模式
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (e) => {
			if (!localStorage.getItem("darkMode")) {
				setDarkMode(e.matches);
			}
		};
		mediaQuery.addListener(handleChange);

		// 清理 listener
		return () => {
			mediaQuery.removeListener(handleChange);
		};
	}, []);

	return (
		<div className="flex items-center">
			<label htmlFor="darkModeToggle" className="mr-2 text-sm">
				Dark Mode
			</label>
			<button
				type={"button"}
				id="darkModeToggle"
				onClick={toggleDarkMode}
				className="p-2 bg-blue-500 text-white rounded"
			>
				{darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
			</button>
		</div>
	);
};

export default DarkModeToggle;
