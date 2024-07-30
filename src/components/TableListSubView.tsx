import type { BidData, RequestData } from "@/types/data";
import {
	convertHoursToDaysAndHours,
	copyToClipboard,
	openInExplorer,
} from "@/utils";
import { faCopy, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./view.module.scss";

const TableListSubView = ({
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
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>ID</th>
					<th>Expiry</th>
					<th>BTC</th>
					<th>BTC&nbsp;Address</th>
					<th>Bids</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{requestData.map((data) => (
					<React.Fragment key={data.id}>
						<tr>
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
							<td>
								<button className={styles.bidButton}>
									Create&nbsp;a&nbsp;Bid
								</button>
							</td>
						</tr>
						{visibleBids.includes(data.id) && (
							<tr>
								<td colSpan={6} className="pb-4">
									<div className={styles.bidsTableContainer}>
										<table className={styles.bidsTable}>
											<thead>
												<tr>
													<th>Bid ID</th>
													<th>Asset</th>
													<th>Amount</th>
													<th>Expiry</th>
												</tr>
											</thead>
											<tbody>
												{mockedBids
													.filter((bid) => bid.requestId === data.id)
													.map((bid) => (
														<tr key={bid.id}>
															<td>{bid.id}</td>
															<td>{bid.asset}</td>
															<td>{bid.amount}</td>
															<td>
																{bid?.expiry &&
																	convertHoursToDaysAndHours(bid.expiry)}
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</td>
							</tr>
						)}
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
};

export default TableListSubView;
