import { createContext, useContext, useState } from "react";

// 创建 context
const ThemeContext = createContext("light");

// 提供一个 hook
export const useThemeContext = () => useContext(ThemeContext);

// Provider 组件
export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light"); // 默认主题为 light

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
