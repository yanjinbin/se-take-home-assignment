import { RefreshPermitsButton } from "@/components/RefreshPermitsButton.jsx";
import PermissionGuard from "@/hoc/PermissionGuard.jsx"; // 导入 PermissionGuard
import { useLogout } from "@/hooks/useLogout.js";
import { useUserStore } from "@/store/userStore.js"; // 导入 PermissionGuard
import { Button, Typography } from "antd";
import React from "react";

function Staff() {
	const permissions = useUserStore((state) => state.permissions);
	const logout = useLogout(); // ✅ 在组件最顶层调用 Hook
	return (
		<>
			<RefreshPermitsButton />
			{/* 👇关键！用于渲染 staff 的子路由页面 */}

			<Typography.Text level={1}>员工页面</Typography.Text>
			<Typography.Text>展示用户精密的权限控制哦</Typography.Text>

			{/* 只有 staff:view 权限的用户才能看到这个部分 */}
			<PermissionGuard permission="staff:view" permissions={permissions}>
				<div>
					<Typography.Title level={2}>员工信息</Typography.Title>

					{/* 只有 staff:edit 权限的用户才有权限编辑员工信息 */}
					<PermissionGuard permission="staff:edit" permissions={permissions}>
						<Button type={"default"}>编辑员工</Button>
					</PermissionGuard>

					{/* 只有 staff:delete 权限的用户才有权限删除员工 */}
					<PermissionGuard permission="staff:delete" permissions={permissions}>
						<Button type={"default"}>删除员工</Button>
					</PermissionGuard>
				</div>
			</PermissionGuard>

			{/* 可选部分：可以增加其他基于权限的页面展示 */}
			<PermissionGuard permission="staff:approve" permissions={permissions}>
				<div>
					<Typography.Title level={2}>审批员工</Typography.Title>
					<Button type={"default"}>审批员工申请</Button>
				</div>
			</PermissionGuard>

			<Button onClick={() => logout("主动退出登录")}>退出按钮</Button>
		</>
	);
}

// 用户列表
function StaffList() {
	return (
		<>
			<h1>用户列表</h1>
			用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表
		</>
	);
}

function StaffDetail() {
	return (
		<>
			<h1>用户详情</h1>
			用户详情用户详情用户详情用户详情用户详情用户详情用户详情用户详情用户详情
		</>
	);
}

export { Staff, StaffList, StaffDetail };
