import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';

interface MetaMaskContextProps {
    account: string | null;
    connectMetaMask: () => void;
    disconnectMetaMask: () => void;
    web3: Web3 | null;
}

export const MetaMaskContext = createContext<MetaMaskContextProps>({
    account: null,
    connectMetaMask: () => {},
    disconnectMetaMask: () => {},
    web3: null,
});

export const MetaMaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [web3, setWeb3] = useState<Web3 | null>(null);

    useEffect(() => {
        const checkMetaMaskConnection = async () => {
            if (window.ethereum) {
                try {
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);
                    const accounts = await web3Instance.eth.getAccounts();
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                } catch (error) {
                    console.error(error);
                }

                window.ethereum.on('accountsChanged', (accounts: string[]) => {
                    setAccount(accounts[0] || null);
                });
            }
        };

        checkMetaMaskConnection();
    }, []);

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.requestAccounts();
                setAccount(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed');
        }
    };

    const disconnectMetaMask = () => {
        setAccount(null);
        setWeb3(null);
    };

    return (
        <MetaMaskContext.Provider value={{ account, connectMetaMask, disconnectMetaMask, web3 }}>
            {children}
        </MetaMaskContext.Provider>
    );
};
