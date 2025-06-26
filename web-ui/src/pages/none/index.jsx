import SvgIcon from "@/components/SvgIcon/index.jsx";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Flex, Splitter, Typography } from "antd";

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { t } from "@/locales/index.js";
import { ApiOutlined } from "@ant-design/icons";
import { AcceptEmail, Home } from "@icon-park/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";

const None = () => {
	const [date, setDate] = useState(new Date());
	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];
	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "#2563eb",
		},
		mobile: {
			label: "Mobile",
			color: "#60a5fa",
		},
	};
	const Desc = (props) => (
		<Flex justify="center" align="center" style={{ height: "100%" }}>
			<Typography.Title
				type="secondary"
				level={5}
				style={{ whiteSpace: "nowrap" }}
			>
				{props.text}
			</Typography.Title>
		</Flex>
	);

	return (
		<div>
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-md border"
			/>
			<Splitter
				layout="vertical"
				style={{ height: 300, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
			>
				<Splitter.Panel>
					<Desc text="First" />
				</Splitter.Panel>
				<Splitter.Panel>
					<Desc text="Second" />
				</Splitter.Panel>
			</Splitter>
			<h1>杂货堆积处</h1>
			<h3>
				Lets go for a <FaBeer />?
			</h3>
			<AiOutlineAlipayCircle />
			<p>{t("translation:http.error")}</p>
			<p>{t("http.error")}</p>

			<Home />
			<Home theme="filled" />
			<p>{t("dashboard")}</p>
			<SvgIcon color={"#FED"} name={"qq-96"} />
			<Icon
				icon="mdi:home-lightbulb"
				width="96"
				height="96"
				style={{ color: "#0b0d35" }}
			/>

			<Icon
				icon="ph:wechat-logo-duotone"
				width="96"
				height="96"
				style={{ color: "#0b0d35" }}
			/>
			<Icon icon="icon-park:wechat" width="96" height="96" />

			{/*<AcceptEmail theme="outline" size="39" fill="#333" />
			<ApiOutlined />
			<div className="flex flex-col items-center justify-center min-h-svh">
				<Button>Click me</Button>
			</div>*/}
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
					<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	);
};

export default None;
