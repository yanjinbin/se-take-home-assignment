import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Space } from "antd";
import { Hamburger } from "lucide-react";
import { Bot } from "lucide-react";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="p-2 flex items-center gap-2">
				<span className="text-2xl">🍔🍟</span>
				<span className="font-bold text-lg text-red-600">McDonald's</span>
			</div>
			<div className="p-2 flex gap-16">
				<Link
					to="/bot"
					className="[&.active]:font-bold flex items-center gap-1"
				>
					<Bot className="w-4 h-4" />
					<span>1.bot</span>
				</Link>

				<Link
					to="/order"
					className="[&.active]:font-bold flex items-center gap-1"
				>
					<Hamburger className="w-4 h-4" />
					<span>2.order</span>
				</Link>
			</div>

			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
