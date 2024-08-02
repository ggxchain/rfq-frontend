import type { QuoteData } from "@/types/data";
import {
	convertHoursToDaysAndHours,
	copyToClipboard,
	openInExplorer,
	shortenAddress,
} from "@/utils";
import { faCopy, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./view.module.scss";

const TableListView = ({
	activeQuotes,
	onLockQuote,
	onCancelQuote,
}: {
	activeQuotes: QuoteData[];
	onLockQuote: (id: number) => void;
	onCancelQuote: (id: number) => void;
}) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Quote ID</th>
					<th>Request ID</th>
					<th>Request Expiry</th>
					<th>Quote Expiry</th>
					<th>Request BTC Address</th>
					<th>Asset</th>
					<th>Amount</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{activeQuotes.map((quote) => (
					<tr key={quote.id}>
						<td>{quote.id}</td>
						<td>{quote.requestId}</td>
						<td>{convertHoursToDaysAndHours(quote.expiry)}</td>
						<td>{convertHoursToDaysAndHours(quote.expiry)}</td>
						<td className="font-mono">
							{shortenAddress(quote.ethAddress)}
							<button
								className={styles.iconButton}
								onClick={() => copyToClipboard(quote.ethAddress)}
							>
								<FontAwesomeIcon icon={faCopy} />
							</button>
							<button
								className={styles.iconButton}
								onClick={() => openInExplorer(quote.ethAddress, true)}
							>
								<FontAwesomeIcon icon={faExternalLinkAlt} />
							</button>
						</td>
						<td>{quote.asset}</td>
						<td>{quote.amount}</td>
						<td>{quote.status}</td>
						<td className="whitespace-nowrap">
							{quote.status === "accepted" && (
								<button
									className={styles.lockButton}
									onClick={() => onLockQuote(quote.id)}
								>
									Lock&nbsp;in&nbsp;Escrow
								</button>
							)}
							<button
								className={styles.cancelButton}
								onClick={() => onCancelQuote(quote.id)}
							>
								Cancel
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableListView;
