import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-screen text-center px-4">
			<h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
			<p className="text-base mb-1">
				The page you are looking for does not exist.
			</p>
			<p className="text-base mb-6">
				Please check the URL or return to the homepage.
			</p>

			<div className="flex gap-4 flex-wrap justify-center">
				<a href="/" className="text-blue-500 underline hover:text-blue-700">
					HTML a标签
				</a>
				<Link to="/" className="text-blue-500 underline hover:text-blue-700">
					React Link
				</Link>
				<Button type="primary" onClick={() => navigate("/")}>
					Button跳转首页
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
