import React, { useState, useEffect } from "react";

const LocationUsage = () => {
	const [position, setPosition] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// 检查浏览器是否支持 Geolocation API
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					// 获取位置信息成功
					setPosition({
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
					});
				},
				(err) => {
					// 获取位置信息失败
					setError(err.message);
				},
			);
		} else {
			setError("Geolocation is not supported by this browser.");
		}
	}, []);

	return (
		<div>
			{error && <p>Error: {error}</p>}
			{position ? (
				<div>
					<h3>Your Location</h3>
					<p>Latitude: {position.latitude}</p>
					<p>Longitude: {position.longitude}</p>
				</div>
			) : (
				<p>Loading location...</p>
			)}
		</div>
	);
};

export default LocationUsage;
