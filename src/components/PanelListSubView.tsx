import type { QuoteData, RequestData } from "@/types/data";
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
					<th>Quotes</th>
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
				</tr>
				<tr>
					<th>Action</th>
					<td>
						<button className={styles.quoteButton}>
							Create&nbsp;a&nbsp;Quote
						</button>
					</td>
				</tr>

				{visibleQuotes.includes(data.id) && (
					<tr>
						<td colSpan={2} className="pb-4">
							<div className={styles.QuotesTableContainer}>
								<table className={styles.QuotesTable}>
									<tbody>
										{mockedQuotes
											.filter((quote) => quote.requestId === data.id)
											.map((quote) => (
												<Fragment key={`sub-info-${quote.id}-${data.id}`}>
													<tr>
														<th>quote ID</th>
														<td>{quote.id}</td>
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
														<th>Expiry</th>
														<td>
															{quote?.expiry &&
																convertHoursToDaysAndHours(quote.expiry)}
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
