interface BidData {
	id: number;
	requestId: number;
	asset: string;
	amount: number;
	expiry: number;
	ethAddress: string;
	status: "active" | "accepted";
}

interface RequestData {
	id: number;
	expiry: number;
	btcAmount: number;
	btcAddress: string;
}
export type { BidData, RequestData };
