import { useUserStore } from "@/store/userStore.js";

export function usePermission(required) {
	const permits = useUserStore((state) => state.permissions);
	const check = (key) => permits.includes(key);
	if (Array.isArray(required)) {
		return required.every(check);
	}
	return check(required);
}
