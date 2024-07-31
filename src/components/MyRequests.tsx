import { MetaMaskContext } from "@/components/MetaMaskContext";
import RFQABI from "@/contracts/RFQ.json";
import { faCopy, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import styles from "./MyRequests.module.scss";

interface RequestData {
	id: number;
	expiry: number;
	btcAmount: number;
	btcAddress: string;
}

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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

const MyRequests: React.FC = () => {
	const { account, web3 } = useContext(MetaMaskContext);
	const [requests, setRequests] = useState<RequestData[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
			const contract = new web3.eth.Contract(RFQABI.abi, CONTRACT_ADDRESS);
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

	return (
		<div className={`${styles.container} ${styles.myRequests}`}>
			{errorMessage && <div className={styles.errorText}>{errorMessage}</div>}
			<h1 className={styles.h1}>My Requests</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Expiry</th>
						<th>BTC</th>
						<th>BTC&nbsp;Address</th>
					</tr>
				</thead>
				<tbody>
					{requests.map((data) => (
						<tr key={data.id}>
							<td>{data.id}</td>
							<td>{convertHoursToDaysAndHours(data.expiry)}</td>
							<td>{data.btcAmount}</td>
							<td className="font-mono">
								{data.btcAddress}
								<button
									className={styles.iconButton}
									onClick={() => copyToClipboard(data.btcAddress)}
								>
									<FontAwesomeIcon icon={faCopy} />
								</button>
								<button
									className={styles.iconButton}
									onClick={() => openInExplorer(data.btcAddress)}
								>
									<FontAwesomeIcon icon={faExternalLinkAlt} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MyRequests;
