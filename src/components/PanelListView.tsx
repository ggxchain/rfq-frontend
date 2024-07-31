import type { BidData } from "@/types/data";
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
	activeBids,
	onLockBid,
	onCancelBid,
}: {
	activeBids: BidData[];
	onLockBid: (id: number) => void;
	onCancelBid: (id: number) => void;
}) => {
	return activeBids.map((bid) => (
		<table
			key={`${bid.id}-bid-id`}
			className={`${styles.table} ${styles.viewTable}`}
		>
			<tbody>
				<tr>
					<th>Bid ID</th>
					<td>{bid.id}</td>
				</tr>
				<tr>
					<th>Request ID</th>
					<td>{bid.requestId}</td>
				</tr>
				<tr>
					<th>Request Expiry</th>
					<td>{convertHoursToDaysAndHours(bid.expiry)}</td>
				</tr>
				<tr>
					<th>Bid Expiry</th>
					<td>{convertHoursToDaysAndHours(bid.expiry)}</td>
				</tr>
				<tr>
					<th>Request BTC Address</th>
					<td className="font-mono">
						{shortenAddress(bid.ethAddress)}
						<button
							className={styles.iconButton}
							onClick={() => copyToClipboard(bid.ethAddress)}
						>
							<FontAwesomeIcon icon={faCopy} />
						</button>
						<button
							className={styles.iconButton}
							onClick={() => openInExplorer(bid.ethAddress, true)}
						>
							<FontAwesomeIcon icon={faExternalLinkAlt} />
						</button>
					</td>
				</tr>
				<tr>
					<th>Asset</th>
					<td>{bid.asset}</td>
				</tr>
				<tr>
					<th>Amount</th>
					<td>{bid.amount}</td>
				</tr>
				<tr>
					<th>Status</th>
					<td>{bid.status}</td>
				</tr>
				<tr>
					<th>Action</th>

					<td className="whitespace-nowrap">
						{bid.status === "accepted" && (
							<button
								className={styles.lockButton}
								onClick={() => onLockBid(bid.id)}
							>
								Lock&nbsp;in&nbsp;Escrow
							</button>
						)}
						<button
							className={styles.cancelButton}
							onClick={() => onCancelBid(bid.id)}
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
