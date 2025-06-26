import About from "@/pages/about/index.jsx";
import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/about")({
	component: About,
});
