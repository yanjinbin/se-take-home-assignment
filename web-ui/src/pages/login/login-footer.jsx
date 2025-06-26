import {
	LoginStateEnum,
	useLoginStateContext,
} from "@/pages/login/providers/login-provider.jsx";
import { Button } from "antd";

export default function LoginFooter() {
	const { loginState, setLoginState } = useLoginStateContext();
	console.log("loginState", loginState);
	const switchTo = (state) => () => setLoginState(state);
	switch (loginState) {
		case LoginStateEnum.LOGIN:
			return (
				<div className="w-full text-sm text-center space-x-4">
					<Button onClick={switchTo(LoginStateEnum.REGISTER)}>
						"账号注册"
					</Button>
					<Button onClick={switchTo(LoginStateEnum.RESET_PASSWORD)}>
						"重置密码"
					</Button>
					<Button onClick={switchTo(LoginStateEnum.MOBILE)}>"手机登录"</Button>
					<Button onClick={switchTo(LoginStateEnum.QR_CODE)}>"扫码登录"</Button>
				</div>
			);
		case LoginStateEnum.REGISTER:
		case LoginStateEnum.RESET_PASSWORD:
		case LoginStateEnum.MOBILE:
		case LoginStateEnum.QR_CODE:
			return (
				<div className="text-sm text-center">
					<Button onClick={switchTo(LoginStateEnum.LOGIN)}>返回登录</Button>
				</div>
			);
		default:
			return null;
	}
}
