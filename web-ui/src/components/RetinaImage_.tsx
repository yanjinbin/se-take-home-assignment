import type React from "react";
import { useState } from "react";

interface RetinaImageProps {
	png1x: string;
	png2x?: string;
	png4x?: string;
	webp1x?: string;
	webp2x?: string;
	webp4x?: string;
	fallback?: string;
	alt?: string;
	className?: string;
	loading?: "lazy" | "eager";
}

const RetinaImage_: React.FC<RetinaImageProps> = ({
	png1x,
	png2x,
	png4x,
	webp1x,
	webp2x,
	webp4x,
	fallback,
	alt = "",
	className = "",
	loading = "lazy",
}) => {
	const [error, setError] = useState(false);

	const handleError = () => {
		setError(true);
	};

	// srcSet 拼接工具
	const makeSrcSet = (srcs: (string | undefined)[], dprs: string[]) =>
		srcs
			.map((src, i) => (src ? `${src} ${dprs[i]}` : null))
			.filter(Boolean)
			.join(", ");

	if (error && fallback) {
		return (
			<img src={fallback} alt={alt} className={className} loading={loading} />
		);
	}

	return (
		<picture>
			{(webp1x || webp2x || webp4x) && (
				<source
					type="image/webp"
					srcSet={makeSrcSet([webp1x, webp2x, webp4x], ["1x", "2x", "4x"])}
				/>
			)}
			<img
				src={png1x}
				srcSet={makeSrcSet([png1x, png2x, png4x], ["1x", "2x", "4x"])}
				alt={alt}
				className={className}
				loading={loading}
				onError={handleError}
			/>
		</picture>
	);
};

export default RetinaImage_;

/*
import RetinaImage from "@/components/RetinaImage";
import png1x from "@/assets/images/logo/logo@1x.png";
import png2x from "@/assets/images/logo/logo@2x.png";
import png4x from "@/assets/images/logo/logo@4x.png";
import webp1x from "@/assets/images/logo/logo@1x.webp";
import webp2x from "@/assets/images/logo/logo@2x.webp";
import webp4x from "@/assets/images/logo/logo@4x.webp";
import fallback from "@/assets/images/logo/fallback.png";
export default function Example() {
  return (
    <RetinaImage
      png1x={png1x}
      png2x={png2x}
      png4x={png4x}
      webp1x={webp1x}
      webp2x={webp2x}
      webp4x={webp4x}
      fallback={fallback}
      alt="品牌图标"
      className="w-16 md:w-32 lg:w-48"
    />
  );
}
*/
