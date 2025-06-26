import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$userId/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div>Hello index 页面</div>
			<Outlet />
		</div>
	);
}
