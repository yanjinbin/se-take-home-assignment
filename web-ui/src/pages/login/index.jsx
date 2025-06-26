import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginFooter from "./login-footer";
import LoginSwitcher from "./login-switcher";
import { LoginStateProvider } from "./providers/login-provider";

export default function LoginPanel() {
	return (
		<LoginStateProvider>
			<Card className=" min-h-screen flex   items-center justify-center bg-gradient-to-br from-blue-200 to-blue-800 dark:from-red-200dark:text-orange-300">
				<CardHeader class={"grid-template-columns:auto"}>
					<CardTitle className="text-2xl font-bold">
						欢迎登录口腔管理系统
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div>
						<LoginSwitcher />
					</div>
					<div>
						<LoginFooter />
					</div>
				</CardContent>
			</Card>
		</LoginStateProvider>
	);
}
