import { useRefreshPermits } from "@/hooks/usePermitsQuery.js";
import { Button, message } from "antd";

export function RefreshPermitsButton() {
	const refreshPermits = useRefreshPermits();

	const handleRefresh = async () => {
		await refreshPermits();
		message.success("权限已刷新");
	};

	return <Button onClick={handleRefresh}>刷新权限</Button>;
}
