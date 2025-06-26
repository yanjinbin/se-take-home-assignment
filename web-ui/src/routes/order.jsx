import OrderPage from "@/pages/order/index.jsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/order")({
	component: OrderPage,
});
