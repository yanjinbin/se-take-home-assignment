import useTabStore from "@/store/tabStore";
import { useUserStore } from "@/store/userStore";
import { rmAK } from "@/utils/auth";
import { notification } from "antd";

/**
 * 安全退出登录
 * @param reason 退出原因提示
 */
export function logout(reason = "您已退出登录") {
	try {
		// 1. 清除认证 token
		rmAK();

		// 2. 获取 userStore 状态
		const userStore = useUserStore.getState();
		const uid = userStore.userInfo?.uid;

		// 3. 清空用户信息
		userStore.resetUser();

		// 4. 清空标签页状态（确保 uid 存在）
		if (uid) {
			const tabStore = useTabStore(uid).getState();
			tabStore.resetTabs?.(); // 防止 resetTabs 不存在时报错
		}

		// 5. 提示信息
		notification.info({
			message: "登出成功",
			description: reason,
		});

		// 6. 强制刷新跳转到登录页，清空所有内存状态
		window.location.href = "/login";
	} catch (err) {
		console.error("退出登录失败", err);
		notification.error({
			message: "退出异常",
			description: "退出登录时发生错误，请刷新页面后重试。",
		});
		window.location.href = "/login"; // 兜底
	}
}
