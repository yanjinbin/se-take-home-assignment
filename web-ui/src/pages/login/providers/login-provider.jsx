/*
export enum LoginStateEnum {
    LOGIN = 0,
    REGISTER = 1,
    RESET_PASSWORD = 2,
    MOBILE = 3,
    QR_CODE = 4,
}

interface LoginStateContextType {
    loginState: LoginStateEnum;
    setLoginState: (loginState: LoginStateEnum) => void;
    backToLogin: () => void;
}
*/

export const LoginStateEnum = {
	LOGIN: "login",
	REGISTER: "register",
	RESET_PASSWORD: "reset-password",
	MOBILE: "mobile",
	QR_CODE: "qr-code",
};

import { createContext, useContext, useState } from "react";

const LoginStateContext = createContext(null);

export function LoginStateProvider({ children }) {
	const [loginState, setLoginState] = useState(LoginStateEnum.LOGIN);
	const backToLogin = () => {
		setLoginState(LoginStateEnum.LOGIN);
	};
	return (
		<LoginStateContext.Provider
			value={{ loginState, setLoginState, backToLogin }}
		>
			{children}
		</LoginStateContext.Provider>
	);
}

export function useLoginStateContext() {
	return useContext(LoginStateContext);
}
