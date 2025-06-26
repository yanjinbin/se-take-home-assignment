import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div>Hello "/posts/"!</div>
			<Outlet />
		</div>
	);
}
