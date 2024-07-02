import React from 'react';
import MetaMaskButton from './MetaMaskButton';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={ styles.header }>
            <div className={ styles.leftContainer }>
                <div className={ styles.logoHeadingContainer }>
                    <img src="/logo.svg" alt="logo" className={ styles.logo }/>
                    <h1 className={ styles.heading }>RFQ</h1>
                </div>
                <p className={ styles.subText }>
                    Non-Custodial Request<br/>for Quote Platform
                </p>
            </div>
            <MetaMaskButton/>
        </header>
    );
};

export default Header;
