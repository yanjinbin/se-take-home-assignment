import { createOrder, fetchOrders } from "@/api/bot.js";
import { Button, Form, Modal, Select, Table, message } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

// 枚举映射
const ORDER_TYPE_MAP = {
	1: "VIP",
	2: "NORMAL",
};

const ORDER_STATUS_MAP = {
	1: "PENDING",
	2: "PROCESSING",
	3: "COMPLETED",
};

export default function OrderPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const loadOrders = async () => {
		setLoading(true);
		try {
			const res = await fetchOrders();
			setOrders(res.data?.data || []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadOrders();
	}, []);

	const handleAdd = async () => {
		const values = await form.validateFields();
		console.log("提交的订单类型:", values.order_type);
		await createOrder(values);
		message.success("订单创建成功");
		setOpen(false);
		loadOrders();
	};

	const columns = [
		{ title: "ID", dataIndex: "id" },
		{
			title: "order type",
			dataIndex: "type",
			render: (v) => ORDER_TYPE_MAP[v] || `未知类型(${v})`,
		},
		{
			title: "status",
			dataIndex: "status",
			render: (v) => ORDER_STATUS_MAP[v] || `未知状态(${v})`,
		},
		{
			title: "processing since",
			dataIndex: "processing_since",
			render: (v) => v || "-", // 某些订单可能没有该字段
		},
	];

	return (
		<>
			<Button
				type="primary"
				onClick={() => setOpen(true)}
				style={{ marginBottom: 16 }}
			>
				add order
			</Button>
			<Table
				rowKey="id"
				dataSource={orders}
				columns={columns}
				loading={loading}
			/>

			<Modal
				open={open}
				title="createOrder"
				onCancel={() => setOpen(false)}
				onOk={handleAdd}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						label="order type"
						name="order_type"
						rules={[{ required: true }]}
					>
						<Select placeholder="please select order type">
							<Option value="VIP">VIP</Option>
							<Option value="NORMAL">Normal</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
