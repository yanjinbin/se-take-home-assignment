import { findMenuByKey } from "@/utils/routeUtils";
import { matchPath } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { addRouteIds } from "@/utils/routeUtils.js";

describe("Route Utils", () => {
	describe("findMenuByKey", () => {
		it("should match static path correctly", () => {
			const path = "/dashboard";
			const result = findMenuByKey(path);
			expect(result).toEqual({ key: "/dashboard", title: "仪表盘" });
		});

		it("should match dynamic path with parameters", () => {
			const path = "/users/123";
			const result = findMenuByKey(path);
			expect(result).toEqual({ key: "/users/:id", title: "用户详情" });
		});

		it("should return undefined if no path matches", () => {
			const path = "/unknown";
			const result = findMenuByKey(path);
			expect(result).toBeUndefined();
		});
	});

	describe("findBreadcrumbTrail", () => {
		it("should return the correct breadcrumb for static path", () => {
			const path = "/dashboard";
			const result = findBreadcrumbTrail(path);
			expect(result).toEqual([{ key: "/dashboard", title: "仪表盘" }]);
		});

		it("should return the correct breadcrumb for dynamic path", () => {
			const path = "/users/123";
			const result = findBreadcrumbTrail(path);
			expect(result).toEqual([
				{ key: "/users", title: "用户管理" },
				{ key: "/users/:id", title: "用户详情" },
			]);
		});

		it("should return an empty breadcrumb for non-existent path", () => {
			const path = "/unknown";
			const result = findBreadcrumbTrail(path);
			expect(result).toEqual([]);
		});
	});
});

describe("matchPath", () => {
	it("should match exact path", () => {
		const result = matchPath("/users", "/users");
		expect(result).not.toBeNull();
		expect(result?.params).toEqual({});
		expect(result?.pathname).toBe("/users");
	});

	it("should match dynamic param", () => {
		const result = matchPath("/users/:id", "/users/42");
		expect(result).not.toBeNull();
		expect(result?.params).toEqual({ id: "42" });
		expect(result?.pathname).toBe("/users/42");
	});

	it("should return null for non-matching path", () => {
		const result = matchPath("/users", "/settings");
		expect(result).toBeNull();
	});

	it("should partially match if `end: false`", () => {
		const result = matchPath({ path: "/users", end: false }, "/users/42");
		expect(result).not.toBeNull();
		expect(result?.pathname).toBe("/users");
	});

	it("should not match partially if `end: true` (default)", () => {
		const result = matchPath("/users", "/users/42");
		console.log(result);
		expect(result).toBeNull();
	});

	it("should match multiple dynamic params", () => {
		const result = matchPath("/users/:uid/posts/:pid", "/users/1/posts/99");
		expect(result).not.toBeNull();
		expect(result?.params).toEqual({ uid: "1", pid: "99" });
	});

	it("should not match if one param is missing", () => {
		const result = matchPath("/users/:uid/posts/:pid", "/users/1/posts");
		expect(result).toBeNull();
	});
});

describe("addRouteIds", () => {
	it("should add id to single-level routes", () => {
		const routes = [{ path: "dashboard" }, { path: "about" }];

		const result = addRouteIds(routes);
		expect(result).toEqual([
			{ path: "dashboard", id: "dashboard" },
			{ path: "about", id: "about" },
		]);
	});

	it("should add id to nested routes", () => {
		const routes = [
			{
				path: "dashboard",
				children: [
					{ path: "home" },
					{
						path: "settings",
						children: [{ path: "profile" }, { path: "security" }],
					},
				],
			},
		];

		const result = addRouteIds(routes);

		expect(result[0].id).toBe("dashboard");
		expect(result[0].children?.[0].id).toBe("dashboard-home");
		expect(result[0].children?.[1].id).toBe("dashboard-settings");
		expect(result[0].children?.[1].children?.[0].id).toBe(
			"dashboard-settings-profile",
		);
		expect(result[0].children?.[1].children?.[1].id).toBe(
			"dashboard-settings-security",
		);
	});

	it("should respect manually provided id", () => {
		const routes = [
			{
				path: "dashboard",
				id: "custom-dashboard",
				children: [{ path: "home" }],
			},
		];

		const result = addRouteIds(routes);
		expect(result[0].id).toBe("custom-dashboard");
		expect(result[0].children?.[0].id).toBe("custom-dashboard-home");
	});

	it("should handle undefined path", () => {
		const routes = [
			{
				children: [
					{
						path: "index",
					},
				],
			},
		];

		const result = addRouteIds(routes);
		expect(result[0].id).toBe("root");
		expect(result[0].children?.[0].id).toBe("root-index");
	});
});
