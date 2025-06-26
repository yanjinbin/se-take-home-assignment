import React, { useEffect, useRef } from "react";

function WaveProgress({
	percent = 50,
	size = 200,
	waveColor = "#3b82f6",
	bgColor = "#f3f4f6",
}) {
	const waveRef = useRef(null);

	useEffect(() => {
		let phase = 0;
		const amplitude = 6;
		const waveLength = 50;
		const fps = 60;

		const renderWave = () => {
			if (!waveRef.current) return;

			const waveHeight = size * (1 - percent / 100);
			let d = `M 0 ${waveHeight}`;

			for (let x = 0; x <= size; x++) {
				const y =
					waveHeight +
					amplitude * Math.sin(((x + phase) / waveLength) * Math.PI * 2);
				d += ` L ${x} ${y}`;
			}

			d += ` L ${size} ${size} L 0 ${size} Z`;
			waveRef.current.setAttribute("d", d);

			phase += 1;
		};

		const interval = setInterval(renderWave, 1000 / fps);
		return () => clearInterval(interval);
	}, [percent, size]);

	return (
		<div
			className="relative rounded-full overflow-hidden shadow-md"
			style={{ width: size, height: size, backgroundColor: bgColor }}
		>
			<svg
				viewBox={`0 0 ${size} ${size}`}
				width={size}
				height={size}
				className="absolute inset-0"
				role="img"
				aria-labelledby="waveTitle"
			>
				<title id="waveTitle">{`Progress: ${percent}%`}</title>
				<path ref={waveRef} fill={waveColor} opacity="0.8" />
			</svg>

			<div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
				{`${percent}%`}
			</div>
		</div>
	);
}

export default WaveProgress;
