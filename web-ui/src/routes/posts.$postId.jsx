import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/posts/$postId")({
	// In a loader
	loader: ({ params }) => console.log(params.postId),
	// Or in a component
	component: PostComponent,
	validateSearch: z.object({
		tab: z.number().optional(),
		page: z.number().optional(),
	}),
});

function PostComponent() {
	// ✅ 获取 path param
	const { postId } = useParams({ from: "/posts/$postId" });

	const search = useSearch({ from: "/posts/$postId" });

	return (
		<div>
			<h2>Post ID: {postId}</h2>
			<p>Tab: {search.tab}</p>
			<p>Page: {search.page}</p>
		</div>
	);
}
