import type { QuoteData } from "@/types/data";

const mockedQuotes: QuoteData[] = [
	{
		id: 1,
		requestId: 1,
		asset: "ETH",
		amount: 1.5,
		expiry: 200,
		ethAddress: "0xAddress1",
		status: "active",
	},
	{
		id: 2,
		requestId: 1,
		asset: "DAI",
		amount: 2500,
		expiry: 200,
		ethAddress: "0xAddress2",
		status: "active",
	},
	{
		id: 3,
		requestId: 2,
		asset: "ETH",
		amount: 1.0,
		expiry: 200,
		ethAddress: "0xAddress3",
		status: "accepted",
	},
];

export { mockedQuotes };
