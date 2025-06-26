import { addBot, deleteBot, fetchBots } from "@/api/bot.js";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	Popconfirm,
	Table,
	message,
} from "antd";
import { useEffect, useState } from "react";

const BOT_STATUS_MAP = {
	1: "IDLE", // IDLE
	2: "BUSY", // BUSY
};

export default function BotPage() {
	const [bots, setBots] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const loadBots = async () => {
		setLoading(true);
		try {
			const res = await fetchBots();
			setBots(res.data?.data || []);
		} finally {
			setLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		loadBots();
	}, []);

	const handleAdd = async () => {
		const values = await form.validateFields();
		await addBot(values);
		message.success("添加成功");
		setOpen(false);
		loadBots();
	};

	const handleDelete = async (id) => {
		await deleteBot(id);
		message.success("删除成功");
		loadBots();
	};

	const columns = [
		{ title: "ID", dataIndex: "id" },
		{ title: "名称", dataIndex: "name" },
		{
			title: "状态",
			dataIndex: "status",
			render: (v) => BOT_STATUS_MAP[v] || `未知状态(${v})`,
		},
		{
			title: "操作",
			render: (_, record) => (
				<Popconfirm
					title="确认删除？"
					onConfirm={() => handleDelete(record.id)}
				>
					<Button danger size="small">
						删除
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<>
			<Button
				type="primary"
				onClick={() => setOpen(true)}
				style={{ marginBottom: 16 }}
			>
				添加 Bot
			</Button>
			<Table
				rowKey="id"
				dataSource={bots}
				columns={columns}
				loading={loading}
			/>

			<Modal
				open={open}
				title="添加 Bot"
				onCancel={() => setOpen(false)}
				onOk={handleAdd}
			>
				<Form form={form} layout="vertical">
					<Form.Item label="名称" name="name" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="处理时间（秒）"
						name="handle_time"
						rules={[{ required: true }]}
					>
						<InputNumber min={1} style={{ width: "100%" }} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
