import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { t } from "@/locales/index.js";
import { useUserStore } from "@/store/userStore.js";
import { getAK, setAK } from "@/utils/auth.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export function ProfileForm() {
	const navigate = useNavigate();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const setUserInfo = useUserStore((state) => state.setUserInfo);
	function onSubmit(values) {
		console.log(values);
		setUserInfo({
			name: "李磊",
			nickname: "dd",
			phone: "110",
			role: "admin",
			uid: "666",
		});
		setAK("kskkskd");
		navigate("/dashboard");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("username")}</FormLabel>
							<FormControl>
								<Input placeholder="Doctor chris" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("password")}</FormLabel>
							<FormControl>
								<Input placeholder="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="font-black bg-primary text-blue-500">
					{t("login")}
				</Button>
			</form>
		</Form>
	);
}

const Login = () => {
	const navigate = useNavigate();
	useEffect(() => {
		// 判断是否有 token 或 userInfo
		const token = getAK(); // 或者你可以直接检查 localStorage.getItem("ak")
		if (token) {
			navigate("/dashboard");
		}
	}, [navigate]);
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
				<ProfileForm />
			</div>
		</div>
	);
};
export default Login;
