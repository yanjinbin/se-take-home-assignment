import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout/b")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_pathlessLayout/b"!</div>;
}
