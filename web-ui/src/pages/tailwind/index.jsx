import mcdonaldsLogo from "@/assets/mcdonalds.png";
import logo1x from "@/assets/message/Group.png";
import logoWebp1x from "@/assets/message/Group.webp";
import logo2x from "@/assets/message/Group@2x.png";
import logoWebp2x from "@/assets/message/Group@2x.png";
import logo3x from "@/assets/message/Group@3x.png";
import logoWebp3x from "@/assets/message/Group@3x.webp";
import villasPng from "@/assets/villas.png";
import RetinaImage from "@/components/RetinaImage.jsx";
import { Button } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";
import { clsx } from "clsx";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
function Button2({ primary, disabled }) {
	const buttonClass = twMerge(
		clsx(
			"rounded px-4 py-2 transition duration-200",
			primary && "bg-blue-500 text-white",
			disabled && "opacity-50 cursor-not-allowed",
		),
	);

	return (
		<button type="button" className={buttonClass} disabled={disabled}>
			Click me
		</button>
	);
}

const Tailwind = () => {
	const { pathname } = useLocation();
	console.log(pathname);
	const isbig = true;
	return (
		<>
			<img
				alt={""}
				className={"w-[300px] h-[240px] object-cover"}
				src={villasPng}
			/>
			<div className={"bg-black text-white"}>黑色</div>
			<div className={"bg-white text-black"}>白色</div>
			<div className="bg-[oklch(0.2_0.01_270)] text-[oklch(0.98_0_0)]">
				Hello Dark!
			</div>
			<div className="bg-white dark:bg-gray-900 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
				<div>
					<span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
						<svg
							className="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							"哈哈"
						</svg>
					</span>
				</div>
				<h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">
					Writes upside-down
				</h3>
				<p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
					The Zero Gravity Pen can be used to write in any orientation,
					including upside-down. It even works in outer space.
				</p>
			</div>
			<Button className={"bg-blue-400 disabled:hover:bg-amber-600"}>
				点我
			</Button>
			<div className="font-poppins">This headline will use Poppins.</div>
			<div className="bg-mint-500 debug-border-blue">"design token”</div>
			<div
				style={{
					backgroundColor: "var(--color-mint-500)",
				}}
			>
				"design token"
			</div>

			<div className="block md:hidden">小屏显示</div>
			<div className="hidden md:block">大屏显示</div>

			<div className="flex items-center justify-center  bg-gradient-to-br from-blue-200 to-purple-600">
				<div className="text-white text-1xl font-bold p-6 bg-black/40 rounded-xl shadow-lg">
					hello tailwind
				</div>
			</div>
			<div className="flex justify-center mt-6">
				<Button2 primary={true} disabled={false} />
			</div>
			<div className="debug-border">
				<div className={"w-1/2 debug-border"}>你说呢</div>
				<div className={cn("p-2", isbig && "p-4", "text-red-500")}>哈哈</div>
			</div>
			<RetinaImage
				className={"max-w-full  block w-64 h-48 object-contain"}
				webpSrcSet={{
					"1x": logoWebp1x,
					"2x": logoWebp2x,
					"3x": logoWebp3x,
				}}
				fallbackSrcSet={{
					"1x": logo1x,
					"2x": logo2x,
					"3x": logo3x,
				}}
				alt="Logo demo"
			/>
		</>
	);
};

export default Tailwind;
