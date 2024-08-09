import { MetaMaskContext } from "@/components/MetaMaskContext";
import MyRequestsPanelView from "@/components/MyRequestsPanelView";
import MyRequestsTableView from "@/components/MyRequestsTableView";
import PageTitle from "@/components/PageTitle";
import RFQABI from "@/contracts/RFQ.json";
import { View } from "@/types/view";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import styles from "./MyRequests.module.scss";

import type { RequestData } from "@/types/data";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const MyRequests: React.FC = () => {
	const { account, web3 } = useContext(MetaMaskContext);
	const [requests, setRequests] = useState<RequestData[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [viewType, setViewType] = useState<View>(
		(isMobile && View.view) || View.table,
	);
	useEffect(() => {
		if (web3 && account) {
			fetchRequests();
		}
	}, [web3, account]);

	const fetchRequests = async () => {
		if (!web3 || !account) {
			setErrorMessage("MetaMask is not connected.");
			return;
		}

		try {
			const contract = new web3.eth.Contract(
				RFQABI?.abi || [],
				CONTRACT_ADDRESS,
			);
			const requestCounterStr: string = await contract.methods
				.requestCounter(web3.utils.asciiToHex(account))
				.call();
			const requestCounter = Number.parseInt(requestCounterStr, 10);

			const fetchedRequests: RequestData[] = [];

			for (let i = 0; i < requestCounter; i++) {
				const request: {
					expiry: string;
					amount: string;
					bitcoinAddress: string;
				} = await contract.methods
					.requests(web3.utils.asciiToHex(account), i)
					.call();

				fetchedRequests.push({
					id: i,
					expiry: Number(request.expiry),
					btcAmount: Number.parseFloat(
						web3.utils.fromWei(request.amount, "gwei"),
					), // Using 'gwei' for BTC to satoshi conversion
					btcAddress: web3.utils.hexToAscii(request.bitcoinAddress),
				});
			}

			setRequests(fetchedRequests);
		} catch (error) {
			console.error("Error fetching requests:", error);
			setErrorMessage("Error fetching requests. Please try again later.");
		}
	};
	const renderList = () => {
		switch (viewType) {
			case View.view:
				return <MyRequestsPanelView requests={requests} />;
			default:
				return <MyRequestsTableView requests={requests} />;
		}
	};
	return (
		<div className={`${styles.container} ${styles.myRequests}`}>
			{errorMessage && <div className={styles.errorText}>{errorMessage}</div>}
			<PageTitle activeView={viewType} setView={setViewType}>
				My Requests
			</PageTitle>
			{renderList()}
		</div>
	);
};

export default MyRequests;
