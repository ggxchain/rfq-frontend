import type { BidData, RequestData } from "@/types/data";
import {
	convertHoursToDaysAndHours,
	copyToClipboard,
	openInExplorer,
	shortenAddress,
} from "@/utils";
import { faCopy, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import styles from "./view.module.scss";

const PanelListSubView = ({
	requestData,
	getBidsCount,
	visibleBids,
	toggleBidsVisibility,
	mockedBids,
}: {
	visibleBids: number[];
	requestData: RequestData[];
	getBidsCount: (id: number) => number;
	toggleBidsVisibility: (id: number) => void;
	mockedBids: Partial<BidData>[];
}) => {
	return requestData.map((data) => (
		<table key={`${data.id}-list`} className={styles.table}>
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
						{shortenAddress(data.btcAddress)}
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
				<tr>
					<th>Bids</th>
					<td>
						{getBidsCount(data.id)}
						{getBidsCount(data.id) > 0 && (
							<button
								className={styles.showHideButton}
								onClick={() => toggleBidsVisibility(data.id)}
							>
								{visibleBids.includes(data.id) ? "Hide" : "Show"}
							</button>
						)}
					</td>
				</tr>
				<tr>
					<th>Action</th>
					<td>
						<button className={styles.bidButton}>Create&nbsp;a&nbsp;Bid</button>
					</td>
				</tr>

				{visibleBids.includes(data.id) && (
					<tr>
						<td colSpan={2} className="pb-4">
							<div className={styles.bidsTableContainer}>
								<table className={styles.bidsTable}>
									<tbody>
										{mockedBids
											.filter((bid) => bid.requestId === data.id)
											.map((bid) => (
												<Fragment key={`sub-info-${bid.id}-${data.id}`}>
													<tr>
														<th>Bid ID</th>
														<td>{bid.id}</td>
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
														<th>Expiry</th>
														<td>
															{bid?.expiry &&
																convertHoursToDaysAndHours(bid.expiry)}
														</td>
													</tr>
												</Fragment>
											))}
									</tbody>
								</table>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	));
};

export default PanelListSubView;
