const Forbidden = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<h1 className="text-6xl font-bold text-red-600">403</h1>
			<p className="mt-4 text-lg text-gray-700">
				Forbidden: You don't have permission to access this page.
			</p>
		</div>
	);
};
export default Forbidden;
