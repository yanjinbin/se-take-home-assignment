import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClickToComponent } from "click-to-react-component";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";
import "virtual:svg-icons-register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "@/locales/index.js";
import DarkModeToggle from "@/components/DarkModeToggle.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</HelmetProvider>
		{import.meta.env.DEV && <ClickToComponent />}
	</StrictMode>,
);
