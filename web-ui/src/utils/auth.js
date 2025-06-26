const AKKey = "ACCESS-TOKEN";

const getAK = () => {
	return window.localStorage.getItem(AKKey);
};

const setAK = (token) => {
	// 确保 token 中包含 "Bearer " 前缀，如果没有则添加
	let ak = token;
	if (!token.startsWith("Bearer ")) {
		ak = `Bearer ${token}`;
	}

	// 将带有 "Bearer " 前缀的 token 存储到 localStorage
	return window.localStorage.setItem(AKKey, ak);
};

const rmAK = () => {
	window.localStorage.removeItem(AKKey);
};
export { getAK, setAK, rmAK };
