import type { AppProps } from 'next/app';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import styles from './_app.module.scss';
import React from 'react';
import '@/styles/globals.css';
import { MetaMaskProvider } from '@/components/MetaMaskContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <MetaMaskProvider>
            <div className={ styles.container }>
                <Header/>
                <div className="flex flex-1 pb-10">
                    <Menu className="w-1/4"/>
                    <main className={ styles.main }>
                        <Component { ...pageProps } />
                    </main>
                </div>
                <Footer/>
            </div>
        </MetaMaskProvider>
    );
};

export default MyApp;
