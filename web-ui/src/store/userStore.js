import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
	persist(
		(set) => ({
			permissions: [],
			userInfo: {
				name: "", // 姓名
				nickname: "", // 昵称
				phone: "", // 手机号
				role: "", // 角色
				uid: "", // 用户ID
			},
			setPermissions: (permissions) => set({ permissions: permissions }), // 设置权限
			setUserInfo: (userInfo) => set({ userInfo }), // 设置用户信息
			resetUser: () => set({ permissions: [], userInfo: {} }), // 重置用户信息
		}),
		{
			name: "userStore", // 使用localStorage来保存状态
			getStorage: () => localStorage,
		},
	),
);
