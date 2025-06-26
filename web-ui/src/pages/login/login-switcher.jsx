import LoginForm from "@/pages/login/login-form.jsx";
import PhoneForm from "@/pages/login/phone-form.jsx";
import {
	LoginStateEnum,
	useLoginStateContext,
} from "@/pages/login/providers/login-provider.jsx";
import { QrcodeForm } from "@/pages/login/qrcode-form.jsx";
import RegisterForm from "@/pages/login/register-form.jsx";
import ResetPasswordForm from "@/pages/login/reset-password.jsx";

export default function LoginSwitcher() {
	const { loginState } = useLoginStateContext();
	switch (loginState) {
		case LoginStateEnum.LOGIN:
			return <LoginForm />;
		case LoginStateEnum.MOBILE:
			return <PhoneForm />;
		case LoginStateEnum.QR_CODE:
			return <QrcodeForm />;
		case LoginStateEnum.REGISTER:
			return <RegisterForm />;
		case LoginStateEnum.RESET_PASSWORD:
			return <ResetPasswordForm />;
		default:
			return <LoginForm />;
	}
}
