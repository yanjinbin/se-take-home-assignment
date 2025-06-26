import { Button as RawButton } from "@/components/ui/button.jsx";
import { useThemeContext } from "@/pages/context-usage/ThemeProvider.jsx";
import styled from "styled-components";

// 定义不同主题的样式
const themeStyles = {
	light: {
		background: "#ffffff",
		color: "#000000",
		border: "1px solid #ccc",
	},
	dark: {
		background: "#333333",
		color: "#ffffff",
		border: "1px solid #555",
	},
};

// 创建 styled button，使用 props 动态设置样式
const StyledButton = styled(RawButton)`
  background-color: ${(props) => props.$style.background};
  color: ${(props) => props.$style.color};
  border: ${(props) => props.$style.border};
  &:hover {
    opacity: 0.8;
  }
`;

const ThemeButton = () => {
	const { theme, toggleTheme } = useThemeContext();
	const style = themeStyles[theme] || themeStyles.light;

	return (
		<StyledButton type="button" $style={style} onClick={toggleTheme}>
			当前主题：{theme}，点击切换
		</StyledButton>
	);
};

export default ThemeButton;
