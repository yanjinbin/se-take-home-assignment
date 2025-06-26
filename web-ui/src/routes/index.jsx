import LoginPanel from "@/pages/login/index.jsx";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: LoginPanel,
});
