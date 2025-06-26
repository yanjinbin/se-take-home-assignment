import {
	createFileRoute,
	useRouteContext,
	useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/context-usage")({
	component: RouteComponent,
});

function RouteComponent() {
	const selected = useRouteContext((state) => state.context.selected);
	console.log("selected", selected);

	return (
		<div>
			<h1>欢迎，用户：{selected.user.id}</h1>
			<ul>
				{selected.permissions.map((permission) => (
					<li key={permission}>{permission}</li>
				))}
			</ul>
		</div>
	);
}
