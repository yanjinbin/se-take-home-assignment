import { getAK } from "@/utils/auth.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = getAK();
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	return children;
};

export default AuthGuard;
