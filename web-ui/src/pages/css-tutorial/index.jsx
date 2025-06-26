import { Button } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

const CssUsage = () => {
	return (
		<div className={"w-full text-xl h-screen overflow-auto border"}>
			<div className={"flex justify-center p-4 border-8 m-6 leading-snug"}>
				css 用法 css 用法 css 用法 css 用法 css 用法 css 用法 css 用法 css 用法
				css 用法 css 用法 css 用法 css 用法 css 用法 css 用法 css 用法 css 用法
			</div>
			<div className={"w-8 break-words whitespace-normal text-sm"}>
				"哈哈你aejslssdddddds我"
			</div>
			<div className="text-base leading-7 font-mono tracking-wide">
				哈哈 you 说的对！
			</div>
			<p className="leading-relaxed tracking-normal">
				我爱 TailwindCSS。It makes layout easier!
			</p>
			<div className={"flex"}>
				<div className={"w-1/3 bg-blue-500"}>我占据 1/3</div>
				<div className={"w-2/3 bg-amber-300"}>我占据 2/3</div>
				<div className={"w-2/3 bg-lime-300"}>我占据 2/3</div>
			</div>
			<div className={"flex"}>
				<div className={"w-full bg-fuchsia-200"}>我占据 full</div>
			</div>
			<div className="p-6 space-y-6">
				<div className="font-sans text-lg">
					<h2 className="font-bold text-xl mb-2">无衬线字体（Sans-serif）</h2>
					<p>TTTT 你好，Hello world! This is a sans-serif paragraph.</p>
				</div>

				<div className="font-serif text-lg">
					<h2 className="font-bold text-xl mb-2">衬线字体（Serif）</h2>
					<p>TTTT 你好，Hello world! This is a serif paragraph.</p>
				</div>

				<div className="font-mono text-lg">
					<h2 className="font-bold text-xl mb-2">等宽字体（Monospace）</h2>
					<p>TTTT 你好，Hello world! This is a monospace paragraph. </p>
				</div>
				{/*font-semibold*/}
				<div>
					<div className={"font-thin"}>this is font</div>
					<div className={"font-semibold"}>this is font</div>
					<div className={"font-[1000]"}>this is font</div>
				</div>
			</div>
			<div>
				<div className={" ordinal slashed-zero"}>
					0 1st,2nd,3rd,4th,5th, 11th, 12th, 2th
				</div>
				<div className="proportional-nums">12121</div>
				<div className="proportional-nums">90909</div>
				<div className="diagonal-fractions">1/2 3/4 5/6</div>
			</div>
			<div>
				<p className="tracking-tight">The quick brown fox ...</p>
				<p className="tracking-normal">The quick brown fox ...</p>
				<p className="tracking-wide">The quick brown fox ...</p>
			</div>
			<div>
				<div>展示文字线夹的用法</div>
				<article>
					<time>Mar 10, 2020</time>
					<h2>Boost your conversion rate</h2>
					<p className="w-2/3 line-clamp-3">
						Nulla dolor velit adipisicing duis excepteur esse in duis nostrud
						occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex
						occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu
						dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut
						cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure
						quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad
						sint voluptate sunt elit mollit officia ad enim sit consectetur
						enim.
					</p>
					<div>Lindsay Walton</div>
				</article>
			</div>
			<div>
				<div className={"text-1/[2]"}>text-1/[2]-字体大小和行高 0 1 2 abc</div>
				<div className={"text-lg/7"}>text-lg/7-字体大小和行高 0 1 2 abc</div>
			</div>

			<div className={"text-left"}>
				So I started to walk into the water. I won't lie to you boys, I was
				terrified. But I pressed on, and as I made my way past the breakers a
				strange calm came over me. I don't know if it was divine intervention or
				the kinship of all living things but I tell you Jerry at that moment, I
				was a marine biologist.
				于是我开始往水里走。说实话，我当时真的吓坏了。但我继续往前走，穿过浪花时，一种奇异的平静笼罩着我。我不知道这是神的旨意，还是万物皆有灵性，但我告诉你，杰瑞，那一刻，我简直就是一个海洋生物学家。
			</div>
			<div className={"text-center"}>
				So I started to walk into the water. I won't lie to you boys, I was
				terrified. But I pressed on, and as I made my way past the breakers a
				strange calm came over me. I don't know if it was divine intervention or
				the kinship of all living things but I tell you Jerry at that moment, I
				was a marine biologist.
				于是我开始往水里走。说实话，我当时真的吓坏了。但我继续往前走，穿过浪花时，一种奇异的平静笼罩着我。我不知道这是神的旨意，还是万物皆有灵性，但我告诉你，杰瑞，那一刻，我简直就是一个海洋生物学家。
			</div>
			<div className={"text-right"}>
				So I started to walk into the water. I won't lie to you boys, I was
				terrified. But I pressed on, and as I made my way past the breakers a
				strange calm came over me. I don't know if it was divine intervention or
				the kinship of all living things but I tell you Jerry at that moment, I
				was a marine biologist.
				于是我开始往水里走。说实话，我当时真的吓坏了。但我继续往前走，穿过浪花时，一种奇异的平静笼罩着我。我不知道这是神的旨意，还是万物皆有灵性，但我告诉你，杰瑞，那一刻，我简直就是一个海洋生物学家。
			</div>
			<div className="w-full">
				<div className="w-1/3 mx-auto text-blue-500/75 hover:text-amber-900 text-center">
					So I started to walk into the water. I won't lie to you boys, I was
					terrified. But I pressed on, and as I made my way past the breakers a
					strange calm came over me. I don't know if it was divine intervention
					or the kinship of all living things but I tell you Jerry at that
					moment, I was a marine biologist.
					于是我开始往水里走。说实话，我当时真的吓坏了。但我继续往前走，穿过浪花时，一种奇异的平静笼罩着我。我不知道这是神的旨意，还是万物皆有灵性，但我告诉你，杰瑞，那一刻，我简直就是一个海洋生物学家。
				</div>
			</div>
			<div>
				<p className={cn("uppercase", "capitalize", "normal-case")}>
					The quick brown fox ...
				</p>
			</div>

			<div className="space-y-6 p-6 max-w-md">
				<h1 className="text-2xl font-bold">文本溢出处理对比</h1>

				{/* truncate 示例 */}
				<div>
					<h2 className="font-semibold text-lg mb-1">
						1. `truncate`（推荐，自动省略）
					</h2>
					<div className="truncate w-48 bg-yellow-100 p-2 border">
						这是一段非常非常非常非常长的文字，会被自动省略掉…
					</div>
				</div>

				{/* text-ellipsis 示例 */}
				<div>
					<h2 className="font-semibold text-lg mb-1">
						2. `text-ellipsis`（需要额外样式）
					</h2>
					<div className="w-48 overflow-hidden whitespace-nowrap  text-ellipsis bg-green-100 p-2 border">
						这是一段非常非常非常非常长的文字，会被自动省略掉…
					</div>
				</div>

				{/* text-clip 示例 */}
				<div>
					<h2 className="font-semibold text-lg mb-1">
						3. `text-clip`（截断但不显示省略号）
					</h2>
					<div className="w-48 overflow-hidden whitespace-nowrap text-clip bg-blue-100 p-2 border">
						这是一段非常非常非常非常长的文字，会被直接裁剪
					</div>
				</div>
			</div>
			<div>
				<p>
					Higher resolution means more than just a better-quality image. With a
					Retina 6K display,
					<a
						className="text-blue-600 before:content-['🔥'] after:content-['_↗']"
						href="css-usage"
					>
						Pro Display XDR
					</a>
					<div style={{ "--my-content": "'✨ 特别内容 ✨'" }}>
						<p className="before:content-[var(--my-content)] before:block">
							哈哈哈
						</p>
					</div>
					gives you nearly 40 percent more screen real estate than a 5K display.
				</p>
			</div>
			<div>https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space</div>
			<div>
				<article className="text-pretty">
					<h3>Beloved Manhattan soup stand closes</h3>
					<p>
						New Yorkers are facing the winter chill with less warmth this year
						as the city's most revered soup stand unexpectedly shutters,
						following a series of events that have left the community puzzled.
					</p>
				</article>
			</div>
			<div>
				<p className="indent-16">
					So I started to walk into the water. I won't lie to you boys, I was
					terrified. But I pressed on, and as I made my way past the breakers a
					strange calm came over me. I don't know if it was divine intervention
					or the kinship of all living things but I tell you Jerry at that
					moment, I was a marine biologist
				</p>
			</div>
			<div>
				<p className="whitespace-normal">
					Hey everyone! It's almost 2022 and we still don't know if there are
					aliens living among us, or do we? Maybe the person writing this is an
					alien. You will never know.
				</p>
			</div>

			<div>
				<p className="break-normal w-[256px]">
					<br />
					The longest word in any of the major English language dictionaries is
					pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a
					lung disease contracted from the inhalation of very fine silica
					particles, specifically from a volcano; medically, it is the same as
					silicosis.
				</p>
			</div>
			<div
				className={cn(
					"h-64",
					"overflow-y-scroll",
					"bg-fixed",
					"bg-scroll", // 与 bg-scroll 冲突，只用其一
					"bg-[url('https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80')]",
				)}
			>
				Because the mail never stops. It just keeps coming and coming and
				coming, there's never a let-up. It's relentless. Every day it piles up
				more and more and more. And you gotta get it out but the more you get it
				out the more it keeps coming in. And then the barcode reader breaks and
				it's Publisher's Clearing House day. — Newman
			</div>
			<div>
				<div className="border-4 bg-indigo-500 bg-clip-border p-3">
					hello world
				</div>
				<div className="border-4 bg-indigo-500 bg-clip-padding p-3">
					hello world
				</div>
				<div className="border-4 bg-indigo-500 bg-clip-content p-3">
					hello world
				</div>
			</div>
		</div>
	);
};

export default CssUsage;
