// src/components/Breadcrumbs.jsx
import { Breadcrumb } from "antd";
import { Link, useMatches } from "react-router-dom";

export default function Breadcrumbs() {
	const matches = useMatches();

	// 过滤掉没有 handle.title 的路由
	const breadcrumbItems = matches
		.filter((match) => match.handle?.title)
		.map((match) => ({
			title:
				match.pathname === "/" ? (
					<Link to="/">首页</Link>
				) : (
					<Link to={match.pathname}>{match.handle.title}</Link>
				),
			key: match.pathname,
		}));

	return <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />;
}
