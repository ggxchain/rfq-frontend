const convertHoursToDaysAndHours = (hours: number): string => {
	const days = Math.floor(hours / 24);
	const remainingHours = hours % 24;
	return `${days} day${days !== 1 ? "s" : ""}${remainingHours ? `, ${remainingHours} hour${remainingHours !== 1 ? "s" : ""}` : ""}`;
};

const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

const openInExplorer = (address: string, isEth = false) => {
	const url = isEth
		? `https://etherscan.io/address/${address}`
		: `https://www.blockchain.com/btc/address/${address}`;
	window.open(url, "_blank");
};

const shortenAddress = (address: string): string => {
	return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

export {
	shortenAddress,
	openInExplorer,
	convertHoursToDaysAndHours,
	copyToClipboard,
};
