import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/posts_/$postId/edit")({
	component: RouteComponent,
});

function RouteComponent() {
	const { postId } = useParams({ from: "/posts_/$postId/edit" }); // 获取动态路径参数

	return (
		<div>
			Hello "/posts_/{postId}/edit"! Post ID: {postId}
		</div>
	);
}
