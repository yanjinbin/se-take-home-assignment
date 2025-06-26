import { routeTree } from "@/routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import NotFound from "@/pages/NotFound.jsx";

export default function AppRouter() {
	const router = createRouter({
		routeTree,
		defaultPreload: "intent",
		defaultNotFoundComponent: NotFound,
	});
	return <RouterProvider router={router} />;
}
