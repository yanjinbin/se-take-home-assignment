import DarkModeToggle from "@/components/DarkModeToggle.jsx";
import About from "@/pages/about/index.jsx";
import {
	ProgressLoader,
	getProgress,
	handleComplete,
} from "@/pages/animation-usage/LoadingProgress.jsx";
import SearchTable from "@/pages/antd-ui/table.jsx";
import { ThemeProvider } from "@/pages/context-usage/ThemeProvider.jsx";
import ContextUsage from "@/pages/context-usage/index.jsx";
import CssUsage from "@/pages/css-tutorial/index.jsx";
import Cssinjs from "@/pages/cssinjs/index.jsx";
import ServiceUnavailable from "@/pages/error-pages/5xx/index.jsx";
import Forbidden from "@/pages/error-pages/403/index.jsx";
import NotFound from "@/pages/error-pages/404/index.jsx";
import LayoutUsage from "@/pages/layout-usage/index.jsx";
import LocationUsage from "@/pages/location-usage/index.jsx";
import LoginShadcn from "@/pages/login/LoginShadcn/index.jsx";
import Login from "@/pages/login/bak.index.jsx";
import LoginPanel from "@/pages/login/index.jsx";
import LoginAntd from "@/pages/login/loginAntD/index.jsx";
import MotionUsage from "@/pages/motion-usage/index.jsx";
import None from "@/pages/none/index.jsx";
import LineChart from "@/pages/rechart/index.jsx";
import TableQuery from "@/pages/table-query/index.jsx";
import Tailwind from "@/pages/tailwind/index.jsx";
import TroubleShooting from "@/pages/trobule-shooting/index.jsx";
import { User } from "@/pages/user/index.jsx";

const rawStaticRoutes = [
	{
		path: "/login",
		element: <Login />,
		handle: {
			title: "登录",
		},
	},
	{
		path: "/wave",
		element: (
			<ProgressLoader getProgress={getProgress} onComplete={handleComplete} />
		),
		handle: {
			title: "wave progress",
		},
	},
	{
		path: "/location-usage",
		element: <LocationUsage />,
		handle: {
			title: "location usage",
		},
	},
	{
		path: "/layout-usage",
		element: <LayoutUsage />,
		handle: {
			title: "layout usage",
		},
	},
	{
		path: "/motion-usage",
		element: <MotionUsage />,
		handle: {
			title: "motion usage",
		},
	},
	{
		path: "/css-usage",
		element: <CssUsage />,
		handle: {
			title: "css usage",
		},
	},
	{
		path: "/trouble-shooting",
		element: <TroubleShooting />,
		handle: {
			title: "Trouble Shooting",
		},
	},
	{
		path: "/rechart",
		element: <LineChart />,
		handle: {
			title: "登录",
		},
	},
	{
		path: "/login",
		element: (
			<div>
				<LoginPanel class={"h-1/2"} />
				<DarkModeToggle class={"h-1/2"} />
			</div>
		),
		handle: {
			title: "登录",
		},
	},
	{
		path: "/user",
		element: <User />,
		handle: {
			title: "personal",
		},
	},
	{
		path: "/login_shadcn",
		element: <LoginShadcn />,
		handle: {
			title: "登录",
		},
	},
	{
		path: "/login_antd",
		element: <LoginAntd />,
		handle: {
			title: "登录",
		},
	},
	{
		path: "/none",
		element: <None />,
		handle: {
			title: "none",
		},
	},
	{
		path: "/about",
		element: <About />,
		handle: {
			title: "关于",
		},
	},
	{
		path: "/403",
		element: <Forbidden />,
		handle: {
			title: "无权访问该页面",
		},
	},
	{
		path: "/404",
		element: <NotFound />,
		handle: {
			title: "页面找不到",
		},
	},
	{
		path: "/5xx",
		element: <ServiceUnavailable />,
		handle: {
			title: "服务暂时不可用",
		},
	},
	{
		path: "*",
		element: <NotFound />,
		handle: {
			title: "页面找不到",
		},
	},
	{
		path: "/",
		element: <Login />,
		handle: {
			title: "首页",
		},
	},
	{
		path: "/cssinjs",
		element: <Cssinjs />,
		handle: {
			title: "cssinjs page",
		},
	},
	{
		path: "/tailwind",
		element: <Tailwind />,
		handle: {
			title: "tailwind page",
		},
	},
	{
		path: "/table",
		element: <Login />,
		handle: {
			title: "table 用法",
		},
	},
	{
		path: "/table_query",
		element: <TableQuery />,
		handle: {
			title: "table query",
		},
	},
	{
		path: "/search_table",
		element: <SearchTable />,
		handle: {
			title: "search table",
		},
	},
	{
		path: "/context_usage",
		element: (
			<ThemeProvider>
				<ContextUsage />
			</ThemeProvider>
		),
		handle: {
			title: "context usage",
		},
	},
];

export default rawStaticRoutes;
