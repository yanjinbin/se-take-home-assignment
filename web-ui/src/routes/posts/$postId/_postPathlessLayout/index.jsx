import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/_postPathlessLayout/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/posts/$postId/_postPathlessLayout/"!</div>;
}
