import MyRequests from "@/components/MyRequests";
import PageTitle from "@/components/PageTitle";
import PanelListView from "@/components/PanelListView";
import TableListView from "@/components/TableListView";
import { mockedQuotes } from "@/mocks";
import type { QuoteData } from "@/types/data";
import { View } from "@/types/view";
import type React from "react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import styles from "./index.module.scss";

const MyRequestsAndQuotes: React.FC = () => {
	const [_visibleQuotes, setVisibleQuotes] = useState<number[]>([]);
	const [activeQuotes, setActiveQuotes] = useState<QuoteData[]>(mockedQuotes);
	const [viewType, setViewType] = useState<View>(
		(isMobile && View.view) || View.table,
	);
	const _toggleQuotesVisibility = (id: number) => {
		setVisibleQuotes((prev) =>
			prev.includes(id)
				? prev.filter((quoteId) => quoteId !== id)
				: [...prev, id],
		);
	};

	const _getQuotesCount = (requestId: number) => {
		return activeQuotes.filter((quote) => quote.requestId === requestId).length;
	};

	const _handleAcceptQuote = (quoteId: number) => {
		console.log(`Accept quote: ${quoteId}`);
	};

	const handleLockQuote = (quoteId: number) => {
		console.log(`Lock quote: ${quoteId}`);
	};

	const handleCancelQuote = (quoteId: number) => {
		setActiveQuotes((prev) => prev.filter((quote) => quote.id !== quoteId));
	};

	const renderList = () => {
		switch (viewType) {
			case View.view:
				return (
					<PanelListView
						activeQuotes={activeQuotes}
						onLockQuote={handleLockQuote}
						onCancelQuote={handleCancelQuote}
					/>
				);
			default:
				return (
					<TableListView
						activeQuotes={activeQuotes}
						onLockQuote={handleLockQuote}
						onCancelQuote={handleCancelQuote}
					/>
				);
		}
	};

	return (
		<div className={styles.container}>
			<MyRequests />

			<PageTitle activeView={viewType} setView={setViewType}>
				My Active Quotes
			</PageTitle>

			{renderList()}
		</div>
	);
};

export default MyRequestsAndQuotes;
