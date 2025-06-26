import { createFileRoute } from '@tanstack/react-router'
import OrderPage from "@/pages/order/index.jsx";

export const Route = createFileRoute('/order')({
  component: OrderPage,
})
