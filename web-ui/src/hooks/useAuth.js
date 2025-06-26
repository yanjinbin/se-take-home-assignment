import { useUserStore } from "@/store/userStore.js";

export function useAuth() {
	const user = useUserStore((state) => state.user);
	const isLoggedIn = Boolean(user?.token);
	return { user, isLoggedIn };
}
