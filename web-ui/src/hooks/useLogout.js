import useTabStore from "@/store/tabStore.js";
import { useUserStore } from "@/store/userStore.js";
import { rmAK } from "@/utils/auth";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

/**
 * @param {string} defaultReason - 默认提示文案
 * @param {boolean} defaultShowNotification - 是否展示提示（默认 true）
 */
export function useLogout(
	defaultReason = "您已退出登录",
	defaultShowNotification = true,
) {
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);
	const resetUser = useUserStore((state) => state.resetUser);

	return ({ redirectPath = "/login" } = {}) => {
		rmAK();
		const tabStore = useTabStore(userInfo?.uid || "guest");
		tabStore.getState().resetTabs();
		resetUser();

		if (defaultShowNotification) {
			notification.info({
				message: "登出成功",
				description: defaultReason,
			});
		}

		navigate(redirectPath, { replace: true });
	};

	// return logout;
}
