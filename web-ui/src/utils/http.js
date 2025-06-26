import { logout } from "@/utils/logout.js";
import { notification } from "antd";
import Axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { getAK, rmAK, setAK } from "./auth.js";

// Only require AK (token), if it's expired user will be redirected to login. Token is valid for 15 days.
const WhiteList = [
	"/login/password", // Login with phone + password
	"/login/sms", // Login via SMS
];

// Axios instance with case conversion (kebab <-> camel)
const instance = applyCaseMiddleware(
	Axios.create({
		baseURL: import.meta.env.VITE_HTTP_BASE_URL,
		timeout: import.meta.env.VITE_HTTP_TIMEOUT,
		headers: { "Content-Type": "application/json;charset=utf-8" },
	}),
);

// Request interceptor
instance.interceptors.request.use(
	(config) => {
		if (config.url && typeof config.url === "string") {
			if (!WhiteList.includes(config.url)) {
				const Token = getAK();
				if (Token && Token.length > 0 && config.headers) {
					config.headers.Authorization = Token;
				}
			}
		}
		return config;
	},
	(error) => {
		notification.error(error);
		return Promise.reject(error);
	},
);

// Response interceptor
instance.interceptors.response.use(
	(response) => {
		if (response.config.url && WhiteList.includes(response.config.url)) {
			if (response.data?.data?.token) {
				const newToken = response.data.data.token;
				setAK(newToken); // Save new token
			}
		}
		return response;
	},
	(error) => {
		handleError(error); // Global error handler
		return Promise.reject(error);
	},
);

// Global error handler
const handleError = (error) => {
	if (!error.response) {
		// Network error or no response
		notification.error({
			message: "Network Error",
			description: "Please check your internet connection.",
		});
		return;
	}

	const { status, data } = error.response;
	switch (status) {
		case 401: {
			// Unauthorized
			logout("Your session has expired. Please log in again.");
			break;
		}
		case 403:
			// Forbidden
			notification.error({
				message: "Access Denied",
				description: "You do not have permission to access this resource.",
			});
			break;

		case 500:
			// Internal server error
			notification.error({
				message: "Server Error",
				description: "An unexpected error occurred. Please try again later.",
			});
			break;

		default:
			// Other errors
			notification.error({
				message: `Error ${status}`,
				description: data.message || "Request failed. Please try again later.",
			});
	}
};

// Format backend error response into a readable string
function formatErrorResponse(response) {
	let formattedMessage = response.message;

	if (response.errors && response.errors.length > 0) {
		const errorDetails = response.errors
			.map((error) => {
				// Example: "email: Invalid email format"
				return `${error.field}: ${error.error}`;
			})
			.join("; ");

		formattedMessage += ` (Details: ${errorDetails})`;
	}

	return formattedMessage;
}

export default instance;
