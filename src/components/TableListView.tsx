import type { BidData } from "@/types/data";
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
	activeBids,
	onLockBid,
	onCancelBid,
}: {
	activeBids: BidData[];
	onLockBid: (id: number) => void;
	onCancelBid: (id: number) => void;
}) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Bid ID</th>
					<th>Request ID</th>
					<th>Request Expiry</th>
					<th>Bid Expiry</th>
					<th>Request BTC Address</th>
					<th>Asset</th>
					<th>Amount</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{activeBids.map((bid) => (
					<tr key={bid.id}>
						<td>{bid.id}</td>
						<td>{bid.requestId}</td>
						<td>{convertHoursToDaysAndHours(bid.expiry)}</td>
						<td>{convertHoursToDaysAndHours(bid.expiry)}</td>
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
						<td>{bid.asset}</td>
						<td>{bid.amount}</td>
						<td>{bid.status}</td>
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
				))}
			</tbody>
		</table>
	);
};

export default TableListView;
