import type { RequestData } from "@/types/data";
import {
	convertHoursToDaysAndHours,
	copyToClipboard,
	openInExplorer,
} from "@/utils";
import { faCopy, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import styles from "./MyRequests.module.scss";

const MyRequestsTableView: React.FC<{ requests: RequestData[] }> = ({
	requests,
}) => {
	return (
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
	);
};

export default MyRequestsTableView;
