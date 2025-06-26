import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_TAB = {
	key: "/dashboard",
	title: "首页",
	path: "/dashboard",
	closable: false,
};

// ✅ 用于缓存多个 store 实例（每个 uid 对应一个）
const tabStoresMap = new Map();

/**
 * 返回当前用户的 tabStore，根据 uid 分离存储
 * @param {string} uid - 用户唯一 ID
 */
function useTabStore(uid = "guest") {
	if (!uid) throw new Error("uid is required for useTabStore");

	// 如果已存在缓存，直接返回
	if (tabStoresMap.has(uid)) {
		return tabStoresMap.get(uid);
	}

	// 否则创建新的 store 并缓存
	const store = create(
		persist(
			(set) => ({
				tabs: [DEFAULT_TAB],
				activeKey: DEFAULT_TAB.key,
				setActiveKey: (key) => set(() => ({ activeKey: key })),
				addTab: (tab) =>
					set((state) => {
						const exists = state.tabs.some((t) => t.key === tab.key);
						return {
							tabs: exists ? state.tabs : [...state.tabs, tab],
							activeKey: tab.key,
						};
					}),
				removeTab: (key) =>
					set((state) => {
						const newTabs = state.tabs.filter((tab) => tab.key !== key);
						const activeKey =
							state.activeKey === key ? newTabs[0]?.key || "" : state.activeKey;
						return { tabs: newTabs, activeKey };
					}),
				resetTabs: () =>
					set({
						tabs: [DEFAULT_TAB],
						activeKey: DEFAULT_TAB.key,
					}),
			}),
			{
				name: `tabStore_${uid}`, // ✅ uid 隔离的关键
				getStorage: () => localStorage,
			},
		),
	);

	console.log("uid到这里了", uid);
	tabStoresMap.set(uid, store);
	return store;
}

export default useTabStore;
