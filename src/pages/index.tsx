import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import MyRequests from '@/components/MyRequests';

interface BidData {
    id: number;
    requestId: number;
    asset: string;
    amount: number;
    expiry: number;
    ethAddress: string;
    status: 'active' | 'accepted';
}

const mockedBids: BidData[] = [
    {
        id: 1,
        requestId: 1,
        asset: 'ETH',
        amount: 1.5,
        expiry: 200,
        ethAddress: '0xAddress1',
        status: 'active',
    },
    {
        id: 2,
        requestId: 1,
        asset: 'DAI',
        amount: 2500,
        expiry: 200,
        ethAddress: '0xAddress2',
        status: 'active',
    },
    {
        id: 3,
        requestId: 2,
        asset: 'ETH',
        amount: 1.0,
        expiry: 200,
        ethAddress: '0xAddress3',
        status: 'accepted',
    },
];

const convertHoursToDaysAndHours = (hours: number): string => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days} day${days !== 1 ? 's' : ''}${remainingHours ? `, ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}` : ''}`;
};

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

const openInExplorer = (address: string, isEth = false) => {
    const url = isEth
        ? `https://etherscan.io/address/${address}`
        : `https://www.blockchain.com/btc/address/${address}`;
    window.open(url, '_blank');
};

const shortenAddress = (address: string): string => {
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

const MyRequestsAndBids: React.FC = () => {
    const [visibleBids, setVisibleBids] = useState<number[]>([]);
    const [activeBids, setActiveBids] = useState<BidData[]>(mockedBids);

    const toggleBidsVisibility = (id: number) => {
        setVisibleBids((prev) =>
            prev.includes(id) ? prev.filter((bidId) => bidId !== id) : [...prev, id]
        );
    };

    const getBidsCount = (requestId: number) => {
        return activeBids.filter(bid => bid.requestId === requestId).length;
    };

    const handleAcceptBid = (bidId: number) => {
        console.log(`Accept bid: ${bidId}`);
    };

    const handleLockBid = (bidId: number) => {
        console.log(`Lock bid: ${bidId}`);
    };

    const handleCancelBid = (bidId: number) => {
        setActiveBids(prev => prev.filter(bid => bid.id !== bidId));
    };

    return (
        <div className={styles.container}>
            <MyRequests />
            <h1 className={styles.h1}>My Active Bids</h1>
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
                            <button className={styles.iconButton} onClick={() => copyToClipboard(bid.ethAddress)}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                            <button className={styles.iconButton} onClick={() => openInExplorer(bid.ethAddress, true)}>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </button>
                        </td>
                        <td>{bid.asset}</td>
                        <td>{bid.amount}</td>
                        <td>{bid.status}</td>
                        <td className="whitespace-nowrap">
                            {bid.status === 'accepted' && (
                                <button
                                    className={styles.lockButton}
                                    onClick={() => handleLockBid(bid.id)}
                                >
                                    Lock&nbsp;in&nbsp;Escrow
                                </button>
                            )}
                            <button
                                className={styles.cancelButton}
                                onClick={() => handleCancelBid(bid.id)}
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyRequestsAndBids;