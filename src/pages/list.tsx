import PageTitle from "@/components/PageTitle";
import TableListSubView from "@/components/TableListSubView";
import { View } from "@/types/view";
import type React from "react";
import { useState } from "react";
import styles from "./list.module.scss";

import PanelListSubView from "@/components/PanelListSubView";
import type { QuoteData, RequestData } from "@/types/data";
import { isMobile } from "react-device-detect";

const mockedData: RequestData[] = [
	{
		id: 1,
		expiry: 280,
		btcAmount: 2.5,
		btcAddress: "tb1qsvf9w59wykut2q5fz7fehhppkrghvhgqwlkfct",
	},
	{
		id: 2,
		expiry: 400,
		btcAmount: 2.5,
		btcAddress: "tb1qsvf9w59wykut2q5fz7fehhppkrghvhgqwlkfct",
	},
	{
		id: 3,
		expiry: 100,
		btcAmount: 2.5,
		btcAddress: "tb1qsvf9w59wykut2q5fz7fehhppkrghvhgqwlkfct",
	},
];

const mockedQuotes: Partial<QuoteData>[] = [
	{
		id: 1,
		requestId: 1,
		asset: "ETH",
		amount: 1.5,
		expiry: 200,
	},
	{
		id: 2,
		requestId: 1,
		asset: "DAI",
		amount: 2500,
		expiry: 200,
	},
	{
		id: 3,
		requestId: 2,
		asset: "ETH",
		amount: 1.0,
		expiry: 200,
	},
];

const List: React.FC = () => {
	const [visibleQuotes, setVisibleQuotes] = useState<number[]>([]);
	const [viewType, setViewType] = useState<View>(
		(isMobile && View.view) || View.table,
	);

	const toggleQuotesVisibility = (id: number) => {
		setVisibleQuotes((prev) =>
			prev.includes(id)
				? prev.filter((quoteId) => quoteId !== id)
				: [...prev, id],
		);
	};

	const getQuotesCount = (requestId: number) => {
		return mockedQuotes.filter((quote) => quote.requestId === requestId).length;
	};

	const renderList = () => {
		switch (viewType) {
			case View.view:
				return (
					<PanelListSubView
						getQuotesCount={getQuotesCount}
						visibleQuotes={visibleQuotes}
						mockedQuotes={mockedQuotes}
						requestData={mockedData}
						toggleQuotesVisibility={toggleQuotesVisibility}
					/>
				);
			default:
				return (
					<TableListSubView
						getQuotesCount={getQuotesCount}
						visibleQuotes={visibleQuotes}
						mockedQuotes={mockedQuotes}
						requestData={mockedData}
						toggleQuotesVisibility={toggleQuotesVisibility}
					/>
				);
		}
	};

	return (
		<div className={styles.container}>
			<PageTitle activeView={viewType} setView={setViewType}>
				Active Requests
			</PageTitle>

			<h3 className={styles.h3}>Place your Quotes against BTC offers</h3>
			{renderList()}
		</div>
	);
};

export default List;
