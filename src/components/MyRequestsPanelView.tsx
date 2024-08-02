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

const MyRequestsPanelView: React.FC<{ requests: RequestData[] }> = ({
	requests,
}) => {
	if (requests.length === 0) {
		return <div className={styles.errorText}>No requests</div>;
	}
	return requests.map((data) => (
		<table key={`requests-${data.id}`} className={styles.table}>
			<tbody>
				<tr>
					<th>ID</th>

					<td>{data.id}</td>
				</tr>
				<tr>
					<th>Expiry</th>
					<td>{convertHoursToDaysAndHours(data.expiry)}</td>
				</tr>
				<tr>
					<th>BTC</th>

					<td>{data.btcAmount}</td>
				</tr>
				<tr>
					<th>BTC&nbsp;Address</th>

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
			</tbody>
		</table>
	));
};

export default MyRequestsPanelView;
