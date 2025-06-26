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
		message.success("add successfully");
		setOpen(false);
		loadBots();
	};

	const handleDelete = async (id) => {
		await deleteBot(id);
		message.success("delete bot successfully");
		loadBots();
	};

	const columns = [
		{ title: "ID", dataIndex: "id" },
		{ title: "name", dataIndex: "name" },
		{
			title: "status",
			dataIndex: "status",
			render: (v) => BOT_STATUS_MAP[v] || `未知状态(${v})`,
		},
		{
			title: "operations",
			render: (_, record) => (
				<Popconfirm
					title="confirm delete？"
					onConfirm={() => handleDelete(record.id)}
				>
					<Button danger size="small">
						delete
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<>
			<div className="flex justify-center mb-4">
				<Button
					type="primary"
					onClick={() => {
						form.setFieldsValue({
							name: "",
							handle_time: 10,
						});
						setOpen(true);
					}}
					style={{ marginBottom: 16 }}
				>
					add bot
				</Button>
			</div>

			<Table
				rowKey="id"
				dataSource={bots}
				columns={columns}
				loading={loading}
			/>

			<Modal
				open={open}
				title="add Bot"
				onCancel={() => setOpen(false)}
				onOk={handleAdd}
			>
				<Form form={form} layout="vertical">
					<Form.Item label="name" name="name" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="hadnle_time（ seconds ）"
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
