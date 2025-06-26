import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
				<Link to={"/posts"} className="[&.active]:font-bold">
					posts index
				</Link>
				<Link to={"/posts/detail"} className="[&.active]:font-bold">
					posts detail
				</Link>
				<Link to={"/context-usage"} className="[&.active]:font-bold">
					context-usage
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
