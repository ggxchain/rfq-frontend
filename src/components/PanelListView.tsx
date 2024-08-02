import type { QuoteData } from "@/types/data";
import {
	convertHoursToDaysAndHours,
	copyToClipboard,
	openInExplorer,
	shortenAddress,
} from "@/utils";
import styles from "./view.module.scss";

import { faCopy, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PanelListView = ({
	activeQuotes,
	onLockQuote,
	onCancelQuote,
}: {
	activeQuotes: QuoteData[];
	onLockQuote: (id: number) => void;
	onCancelQuote: (id: number) => void;
}) => {
	return activeQuotes.map((quote) => (
		<table
			key={`${quote.id}-quote-id`}
			className={`${styles.table} ${styles.viewTable}`}
		>
			<tbody>
				<tr>
					<th>Quote ID</th>
					<td>{quote.id}</td>
				</tr>
				<tr>
					<th>Request ID</th>
					<td>{quote.requestId}</td>
				</tr>
				<tr>
					<th>Request Expiry</th>
					<td>{convertHoursToDaysAndHours(quote.expiry)}</td>
				</tr>
				<tr>
					<th>Quote Expiry</th>
					<td>{convertHoursToDaysAndHours(quote.expiry)}</td>
				</tr>
				<tr>
					<th>Request BTC Address</th>
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
				</tr>
				<tr>
					<th>Asset</th>
					<td>{quote.asset}</td>
				</tr>
				<tr>
					<th>Amount</th>
					<td>{quote.amount}</td>
				</tr>
				<tr>
					<th>Status</th>
					<td>{quote.status}</td>
				</tr>
				<tr>
					<th>Action</th>

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
			</tbody>
		</table>
	));
};

export default PanelListView;
