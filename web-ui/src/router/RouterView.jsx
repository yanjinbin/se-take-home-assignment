import { routeTree } from "@/routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";

export default function AppRouter() {
	const router = createRouter({
		routeTree,
		defaultPreload: "intent",
	});
	return <RouterProvider router={router} />;
}
