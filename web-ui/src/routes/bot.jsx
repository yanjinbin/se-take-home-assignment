import BotPage from "@/pages/bot/index.jsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bot")({
	component: BotPage,
});
