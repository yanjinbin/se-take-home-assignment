import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import deTranslation from "./de/translation.json";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";
import jaTranslation from "./ja/translation.json";
import zhTranslation from "./zh/translation.json";

i18n
	// .use(Backend) // 本地加载翻译文件, 不需要声明导入
	.use(LanguageDetector)
	.use(initReactI18next) // 连接 i18next 和 React
	.init({
		debug: true,
		supportedLngs: ["zh", "ja", "en", "de", "fr"],
		// 浏览器语言作为默认语言
		detection: {
			order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"], // 检测顺序
			caches: ["localStorage"], // 将语言存储在 cookie 中，以便跨会话使用
			lookupQuerystring: "lang",
		},
		fallbackLng: "en", // 回退语言
		keySeparator: ".", // 支持嵌套结构，如 common.welcome
		nsSeparator: ":", // 支持模块化 namespace，例如 common:welcome
		defaultNS: "translation", // 这里
		interpolation: {
			escapeValue: false, // ??不需要对内容进行转义
		},
		backend: {
			// URL of the backend (where the translations are stored)
			loadPath: "/locales/{{lng}}/{{ns}}.json",
			// loadPath: "/src/i18n/{{lng}}/{{ns}}.json",
		},
		// 声明资源, 静态加载
		resources: {
			de: {
				translation: deTranslation,
			},
			en: {
				translation: enTranslation,
			},
			fr: {
				translation: frTranslation,
			},
			ja: {
				translation: jaTranslation,
			},
			zh: {
				translation: zhTranslation,
			},
		},
		react: {
			useSuspense: false, // 如果不使用 Suspense，请禁用它
		},
	});
export default i18n;
export const { t } = i18n;

// usage i18n t
// t("dashboard")
// <p>{t("http.error")}</p>
// <p>{t("home:dashboard")}</p>
