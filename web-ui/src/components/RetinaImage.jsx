// import React from "react";
//
// const RetinaImage = ({
// 	src1x,
// 	src2x,
// 	src3x,
// 	src4x,
// 	alt = "",
// 	className = "",
// }) => {
// 	const srcSetParts = [];
// 	if (src1x) srcSetParts.push(`${src1x} 1x`);
// 	if (src2x) srcSetParts.push(`${src2x} 2x`);
// 	if (src3x) srcSetParts.push(`${src2x} 3x`);
// 	if (src4x) srcSetParts.push(`${src4x} 4x`);
//
// 	return (
// 		<img
// 			src={src1x}
// 			srcSet={srcSetParts.join(", ")}
// 			alt={alt}
// 			className={className}
// 		/>
// 	);
// };
//
// export default RetinaImage;

import React from "react";

const RetinaImage = ({
	webpSrcSet = {}, // { "1x": "...", "2x": "...", "3x": "...", ... }
	fallbackSrcSet = {}, // 同上，用于非 WebP 格式
	alt = "",
	className = "",
}) => {
	// 拼接 srcSet 字符串
	const makeSrcSet = (srcs) =>
		Object.entries(srcs)
			.map(([dpr, url]) => `${url} ${dpr}`)
			.join(", ");

	// 取 fallback 默认图片（1x 或第一个）
	const fallbackSrc =
		fallbackSrcSet["1x"] || Object.values(fallbackSrcSet)[0] || "";

	return (
		<picture className={className}>
			{Object.keys(webpSrcSet).length > 0 && (
				<source type="image/webp" srcSet={makeSrcSet(webpSrcSet)} />
			)}
			{Object.keys(fallbackSrcSet).length > 0 && (
				<source srcSet={makeSrcSet(fallbackSrcSet)} />
			)}
			<img src={fallbackSrc} alt={alt} />
		</picture>
	);
};

export default RetinaImage;
