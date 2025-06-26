import AppRouter from "@/router/RouterView.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";

const App = () => {
	return (
		<>
			<Helmet>
				<title>ReactActionBoilerplate</title>
			</Helmet>
			<ErrorBoundary
				FallbackComponent={({ error }) => (
					<div role="alert" style={{ padding: 20, color: "red" }}>
						<h2>🚨 Page Error!</h2>
						<p>{error.message}</p>
					</div>
				)}
				onError={(error, info) => {
					console.error("❌ Caught runtime error:", error);
					console.error("🔍 Component stack:", info?.componentStack);
				}}
			>
				<AppRouter />
			</ErrorBoundary>
		</>
	);
};

export default App;
