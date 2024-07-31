import MyRequests from "@/components/MyRequests";
import PageTitle from "@/components/PageTitle";
import PanelListView from "@/components/PanelListView";
import TableListView from "@/components/TableListView";
import { mockedBids } from "@/mocks";
import type { BidData } from "@/types/data";
import { View } from "@/types/view";
import type React from "react";
import { useState } from "react";
import styles from "./index.module.scss";

const MyRequestsAndBids: React.FC = () => {
	const [_visibleBids, setVisibleBids] = useState<number[]>([]);
	const [activeBids, setActiveBids] = useState<BidData[]>(mockedBids);
	const [viewType, setViewType] = useState<View>(View.view);
	const _toggleBidsVisibility = (id: number) => {
		setVisibleBids((prev) =>
			prev.includes(id) ? prev.filter((bidId) => bidId !== id) : [...prev, id],
		);
	};

	const _getBidsCount = (requestId: number) => {
		return activeBids.filter((bid) => bid.requestId === requestId).length;
	};

	const _handleAcceptBid = (bidId: number) => {
		console.log(`Accept bid: ${bidId}`);
	};

	const handleLockBid = (bidId: number) => {
		console.log(`Lock bid: ${bidId}`);
	};

	const handleCancelBid = (bidId: number) => {
		setActiveBids((prev) => prev.filter((bid) => bid.id !== bidId));
	};

	const renderList = () => {
		switch (viewType) {
			case View.view:
				return (
					<PanelListView
						activeBids={activeBids}
						onLockBid={handleLockBid}
						onCancelBid={handleCancelBid}
					/>
				);
			default:
				return (
					<TableListView
						activeBids={activeBids}
						onLockBid={handleLockBid}
						onCancelBid={handleCancelBid}
					/>
				);
		}
	};

	return (
		<div className={styles.container}>
			<MyRequests />

			<PageTitle activeView={viewType} setView={setViewType}>
				My Active Bids
			</PageTitle>

			{renderList()}
		</div>
	);
};

export default MyRequestsAndBids;
