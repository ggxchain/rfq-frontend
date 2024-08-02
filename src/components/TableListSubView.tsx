import type { QuoteData, RequestData } from "@/types/data";
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
	getQuotesCount,
	visibleQuotes,
	toggleQuotesVisibility,
	mockedQuotes,
}: {
	visibleQuotes: number[];
	requestData: RequestData[];
	getQuotesCount: (id: number) => number;
	toggleQuotesVisibility: (id: number) => void;
	mockedQuotes: Partial<QuoteData>[];
}) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>ID</th>
					<th>Expiry</th>
					<th>BTC</th>
					<th>BTC&nbsp;Address</th>
					<th>Quotes</th>
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
								{getQuotesCount(data.id)}
								{getQuotesCount(data.id) > 0 && (
									<button
										className={styles.showHideButton}
										onClick={() => toggleQuotesVisibility(data.id)}
									>
										{visibleQuotes.includes(data.id) ? "Hide" : "Show"}
									</button>
								)}
							</td>
							<td>
								<button className={styles.quoteButton}>
									Create&nbsp;a&nbsp;Quote
								</button>
							</td>
						</tr>
						{visibleQuotes.includes(data.id) && (
							<tr>
								<td colSpan={6} className="pb-4">
									<div className={styles.QuotesTableContainer}>
										<table className={styles.QuotesTable}>
											<thead>
												<tr>
													<th>Quote ID</th>
													<th>Asset</th>
													<th>Amount</th>
													<th>Expiry</th>
												</tr>
											</thead>
											<tbody>
												{mockedQuotes
													.filter((quote) => quote.requestId === data.id)
													.map((quote) => (
														<tr key={quote.id}>
															<td>{quote.id}</td>
															<td>{quote.asset}</td>
															<td>{quote.amount}</td>
															<td>
																{quote?.expiry &&
																	convertHoursToDaysAndHours(quote.expiry)}
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
