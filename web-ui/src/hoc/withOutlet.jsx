import React from "react";
import { Outlet } from "react-router-dom";

/**
 * 包裹一个组件，并自动在末尾添加 <Outlet />。
 */
export function withOutlet(Component) {
	return function WrappedComponent(props) {
		return (
			<>
				<Component {...props} />
				<Outlet />
			</>
		);
	};
}
