import useTabStore from "@/store/tabStore.js";
import { useNavigate } from "react-router-dom";

export function useTabs(uid) {
	const { tabs, addTab, removeTab, setActiveTab } = useTabStore(uid);
	const navigate = useNavigate();

	const openTab = (tab) => {
		addTab(tab);
		navigate(tab.path);
	};

	return { tabs, openTab, removeTab, setActiveTab };
}
