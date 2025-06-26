import mockApi from "@/api/mock.js";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Table } from "antd";

import React, { useState } from "react";

export default function SearchUserTable() {
	const [form] = Form.useForm();
	// const page_size = 10;

	const [params, setParams] = useState({
		name: "",
		age: "",
		page_no: 1,
		page_size: 10,
		sortField: "",
		sortOrder: "",
	});

	const { data, isLoading } = useQuery({
		queryKey: ["users", params],
		queryFn: () => mockApi.mock.fetchUsers(params),
		keepPreviousData: true,
	});
	console.log("data", JSON.stringify(data));
	console.log("isLoading", isLoading);
	console.log("data?.data", JSON.stringify(data?.data.data));
	const res = data?.data ?? { data: [], total: 0 };
	const handleSearch = () => {
		const values = form.getFieldsValue();
		// 过滤掉空值或无效值
		const cleanedValues = Object.fromEntries(
			Object.entries(values).filter(
				([_, v]) => v !== undefined && v !== null && v !== "",
			),
		);
		setParams({
			...params,
			...cleanedValues,
			page_no: 1, // 搜索时重置页码
		});
	};

	const handleTableChange = (pagination, sorter) => {
		const { order, field } = sorter;
		console.log("sorter", sorter);
		console.log("pagination", pagination);
		console.log("order", order);
		console.log("field", field);

		setParams((prev) => ({
			...prev,
			page_no: pagination.current,
			sortField: field || "",
			sortOrder: order === "ascend" ? "asc" : order === "descend" ? "desc" : "",
		}));
	};

	const columns = [
		{ title: "姓名", dataIndex: "name", sorter: true },
		{ title: "年龄", dataIndex: "age", sorter: true },
		{ title: "地址", dataIndex: "address" },
	];

	return (
		<div style={{ padding: 24 }}>
			<Form layout="inline" form={form} initialValues={{ name: "", age: "" }}>
				<Form.Item name="name">
					<Input placeholder="姓名关键词" allowClear />
				</Form.Item>
				<Form.Item name="age">
					<Input placeholder="年龄" allowClear />
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						icon={<SearchOutlined />}
						onClick={handleSearch}
					>
						搜索
					</Button>
				</Form.Item>
				<Form.Item>
					<Button
						onClick={() => {
							form.resetFields();
							setParams({
								name: "",
								age: "",
								page_no: 1,
								page_size: 20,
								sortField: "",
								sortOrder: "",
							});
						}}
					>
						重置
					</Button>
				</Form.Item>
			</Form>

			<Table
				rowKey="id"
				columns={columns}
				dataSource={res.data}
				loading={isLoading}
				// scroll={{ scrollToFirstRowOnChange: true }}
				pagination={{
					current: params.page_no,
					pageSize: params.page_size,
					total: res.total || 0,
					// position: [bottom],
				}}
				onChange={handleTableChange}
				style={{ marginTop: 16 }}
			/>
		</div>
	);
}
