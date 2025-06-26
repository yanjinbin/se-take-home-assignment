import i18n from "i18next";
import { useCallback, useEffect, useState } from "react";

export function useLocale() {
	const [locale, setLocale] = useState(i18n.language); // 初始化为当前语言
	const [messages, setMessages] = useState({});

	// 加载语言文件
	const loadMessages = useCallback(async (newLocale) => {
		try {
			const resources = await import(`../locales/${newLocale}.json`);
			setMessages(resources.default || {});
		} catch (error) {
			console.error(`Error loading messages for locale ${newLocale}:`, error);
		}
	}, []);

	// 副作用：当 locale 改变时调用 i18n.changeLanguage
	useEffect(() => {
		i18n
			.changeLanguage(locale) // 使用 i18next 更新语言
			.then(() => loadMessages(locale)) // 语言切换成功后加载对应翻译
			.catch((error) => {
				console.error(`Error changing language to ${locale}:`, error);
			});
	}, [locale, loadMessages]); // 监听 locale 变化

	return { locale, messages, setLocale }; // 返回 locale, messages 和 changeLocale
}
