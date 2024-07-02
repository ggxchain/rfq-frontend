import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import styles from './MetaMaskButton.module.scss';
import { MetaMaskContext } from './MetaMaskContext';

interface MetaMaskButtonProps {
    linkStyle?: boolean;
}

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({ linkStyle = false }) => {
    const { account, connectMetaMask, disconnectMetaMask } = useContext(MetaMaskContext);

    const shortenAddress = (address: string) => {
        return `${ address.slice(0, 5) }...${ address.slice(-5) }`;
    };

    return (
        <div className={ linkStyle ? styles.metaMaskLink : styles.metaMaskButton }>
            { linkStyle ? (
                <a onClick={ account ? disconnectMetaMask : connectMetaMask }>
                    { account ? ' Disconnect' : ' Connect MetaMask' }
                </a>
            ) : (
                <button type="button" onClick={ account ? disconnectMetaMask : connectMetaMask }>
                    <FontAwesomeIcon icon={ faWallet } className="me-2 text-main-bg"/>
                    { account ? ' Disconnect' : ' Connect MetaMask' }
                </button>
            ) }
            { account && !linkStyle && <p className={ styles.account }>{ shortenAddress(account) }</p> }
        </div>
    );
};

export default MetaMaskButton;
