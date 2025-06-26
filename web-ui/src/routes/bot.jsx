import { createFileRoute } from "@tanstack/react-router";
import BotPage from "@/pages/bot/index.jsx";

export const Route = createFileRoute("/bot")({
	component: BotPage,
});
