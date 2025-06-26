import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$userId")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1>user layout</h1>
			<Outlet />
		</div>
	);
}
