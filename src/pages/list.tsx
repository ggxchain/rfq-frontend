import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './list.module.scss';

interface RequestData {
    id: number;
    expiry: number;
    btcAmount: number;
    btcAddress: string;
}

interface BidData {
    id: number;
    requestId: number;
    asset: string;
    amount: number;
    expiry: number;
}

const mockedData: RequestData[] = [
    {
        id: 1,
        expiry: 280,
        btcAmount: 2.5,
        btcAddress: 'tb1qsvf9w59wykut2q5fz7fehhppkrghvhgqwlkfct',
    },
    {
        id: 2,
        expiry: 400,
        btcAmount: 2.5,
        btcAddress: 'tb1qsvf9w59wykut2q5fz7fehhppkrghvhgqwlkfct',
    },
    {
        id: 3,
        expiry: 100,
        btcAmount: 2.5,
        btcAddress: 'tb1qsvf9w59wykut2q5fz7fehhppkrghvhgqwlkfct',
    },
];

const mockedBids: BidData[] = [
    {
        id: 1,
        requestId: 1,
        asset: 'ETH',
        amount: 1.5,
        expiry: 200,
    },
    {
        id: 2,
        requestId: 1,
        asset: 'DAI',
        amount: 2500,
        expiry: 200,
    },
    {
        id: 3,
        requestId: 2,
        asset: 'ETH',
        amount: 1.0,
        expiry: 200,
    },
];

const convertHoursToDaysAndHours = (hours: number): string => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${ days } day${ days !== 1 ? 's' : '' }${ remainingHours ? `, 
        ${ remainingHours } hour${ remainingHours !== 1 ? 's' : '' }` : '' }`;
};

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

const openInExplorer = (address: string) => {
    window.open(`https://www.blockchain.com/btc/address/${ address }`, '_blank');
};

const List: React.FC = () => {
    const [visibleBids, setVisibleBids] = useState<number[]>([]);

    const toggleBidsVisibility = (id: number) => {
        setVisibleBids((prev) =>
            prev.includes(id) ? prev.filter((bidId) => bidId !== id) : [...prev, id]
        );
    };

    const getBidsCount = (requestId: number) => {
        return mockedBids.filter(bid => bid.requestId === requestId).length;
    };

    return (
        <div className={ styles.container }>
            <h1 className={ styles.h1 }>Active Requests</h1>
            <h3 className={ styles.h3 }>Place your bids against BTC offers</h3>
            <table className={ styles.table }>
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
                { mockedData.map((data) => (
                    <React.Fragment key={ data.id }>
                        <tr>
                            <td>{ data.id }</td>
                            <td>{ convertHoursToDaysAndHours(data.expiry) }</td>
                            <td>{ data.btcAmount }</td>
                            <td className="font-mono">
                                { data.btcAddress }
                                <button className={ styles.iconButton }
                                        onClick={ () => copyToClipboard(data.btcAddress) }>
                                    <FontAwesomeIcon icon={ faCopy }/>
                                </button>
                                <button className={ styles.iconButton }
                                        onClick={ () => openInExplorer(data.btcAddress) }>
                                    <FontAwesomeIcon icon={ faExternalLinkAlt }/>
                                </button>
                            </td>
                            <td>
                                { getBidsCount(data.id) }
                                { getBidsCount(data.id) > 0 && (
                                    <button
                                        className={ styles.showHideButton }
                                        onClick={ () => toggleBidsVisibility(data.id) }
                                    >
                                        { visibleBids.includes(data.id) ? 'Hide' : 'Show' }
                                    </button>
                                ) }
                            </td>
                            <td>
                                <button className={ styles.bidButton }>Create&nbsp;a&nbsp;Bid</button>
                            </td>
                        </tr>
                        { visibleBids.includes(data.id) && (
                            <tr>
                                <td colSpan={ 6 } className="pb-4">
                                    <div className={ styles.bidsTableContainer }>
                                        <table className={ styles.bidsTable }>
                                            <thead>
                                            <tr>
                                                <th>Bid ID</th>
                                                <th>Asset</th>
                                                <th>Amount</th>
                                                <th>Expiry</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            { mockedBids
                                                .filter((bid) => bid.requestId === data.id)
                                                .map((bid) => (
                                                    <tr key={ bid.id }>
                                                        <td>{ bid.id }</td>
                                                        <td>{ bid.asset }</td>
                                                        <td>{ bid.amount }</td>
                                                        <td>{ convertHoursToDaysAndHours(bid.expiry) }</td>
                                                    </tr>
                                                )) }
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        ) }
                    </React.Fragment>
                )) }
                </tbody>
            </table>
        </div>
    );
};

export default List;
