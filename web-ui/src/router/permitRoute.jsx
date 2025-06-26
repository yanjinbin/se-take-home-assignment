import { withOutlet } from "@/hoc/withOutlet.jsx";
import Dashboard from "@/pages/dashboard/index.jsx";
import Home from "@/pages/home/index.jsx";
import Patient from "@/pages/patient/index.jsx";
import Settings from "@/pages/settings/index.jsx";
import Profile from "@/pages/settings/profile/index.jsx";
import Security from "@/pages/settings/security/index.jsx";
import { Staff, StaffDetail, StaffList } from "@/pages/staff/index.jsx";

const rawPermitRoutes = [
	{
		element: <Dashboard />,
		path: "dashboard",
		permission: "dashboard:view",
		handle: {
			title: "仪表盘",
		},
	},
	{
		element: withOutlet(Staff)(),
		path: "staff",
		permission: "staff:view",
		handle: {
			title: "员工",
		},
		children: [
			{
				element: <StaffList />,
				path: "list",
				permission: "staff:view",
				handle: {
					title: "员工列表",
				},
			},
			{
				element: <StaffDetail />,
				path: "detail",
				permission: "staff:view",
				handle: {
					title: "员工详情",
				},
			},
		],
	},
	{
		element: withOutlet(Settings)(),
		path: "settings",
		permission: "settings:view",
		handle: {
			title: "设置",
		},
		children: [
			{
				element: <Profile />,
				path: "profile",
				permission: "profile:view",
				handle: {
					title: "个人资料",
				},
			},
			{
				element: <Security />,
				path: "security",
				permission: "security:view",
				handle: {
					title: "安全设置",
				},
			},
		],
	},
];

export default rawPermitRoutes;
