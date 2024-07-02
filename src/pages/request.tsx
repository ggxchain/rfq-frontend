import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './request.module.scss';
import { MetaMaskContext } from '@/components/MetaMaskContext';
import MetaMaskButton from '@/components/MetaMaskButton';

interface FormData {
    bitcoinAddress: string;
    amount: string;
    expirationDays: string;
    expirationHours: string;
}

const Request: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            amount: '1',
            expirationDays: '90',
            expirationHours: '0'
        }
    });
    const { account } = useContext(MetaMaskContext);

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const validateBitcoinAddress = (address: string): string | boolean => {
        const re = /^(1|3|bc1|tb1)[a-zA-HJ-NP-Z0-9]{25,62}$/;
        return re.test(address) || 'Invalid Bitcoin address format';
    };

    const formatAmount = (value: string): string => {
        return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    };

    const validatePositiveInteger = (value: string): boolean => {
        const number = Number(value);
        return Number.isInteger(number) && number >= 0;
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className={ styles.form }>
            <h1 className={ styles.h1 }>Request for Quote</h1>
            <h3 className={ styles.h3 }>Offer your BTC for Ethereum-based assets</h3>
            <div className="grid grid-cols-2 gap-16 mt-12">
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex-grow">
                            <label htmlFor="ethereumAddress" className="block text-gray-500 text-sm">
                                Ethereum Address (for receiving tokens)
                            </label>
                            { account ? (
                                <input
                                    id="ethereumAddress"
                                    type="text"
                                    value={ account }
                                    readOnly
                                    className="mt-1 p-2 w-full border rounded bg-gray-100 cursor-not-allowed"
                                />
                            ) : (
                                <MetaMaskButton linkStyle/>
                            ) }
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="bitcoinAddress" className="block text-gray-500 text-sm">
                            Bitcoin Address (to sell from)
                        </label>
                        <input
                            id="bitcoinAddress"
                            type="text"
                            { ...register('bitcoinAddress', { validate: validateBitcoinAddress }) }
                            className="mt-1 p-2 w-full border rounded"
                        />
                        { errors.bitcoinAddress && (
                            <span className="text-red-500">{ errors.bitcoinAddress.message }</span>
                        ) }
                    </div>

                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-gray-500 text-sm">
                            Amount of BTC to sell
                        </label>
                        <input
                            id="amount"
                            type="text"
                            { ...register('amount', {
                                onChange: (e) => {
                                    setValue('amount', formatAmount(e.target.value));
                                },
                                validate: (value) => !isNaN(Number(value)) || 'Invalid amount format',
                            }) }
                            className="mt-1 p-2 w-full border rounded"
                        />
                        { errors.amount && <span className="text-red-500">{ errors.amount.message }</span> }
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-500 text-sm">Request Expiration</label>
                        <div className="flex space-x-2">
                            <div className="flex items-center">
                                <label htmlFor="expirationDays"
                                       className="block text-gray-500 text-sm mr-2">Days:</label>
                                <input
                                    id="expirationDays"
                                    type="text"
                                    defaultValue="90"
                                    { ...register('expirationDays', {
                                        validate: validatePositiveInteger,
                                        onChange: (e) => setValue('expirationDays', formatAmount(e.target.value)),
                                    }) }
                                    className="mt-1 p-2 w-16 border rounded"
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="expirationHours"
                                       className="block text-gray-500 text-sm mr-2">Hours:</label>
                                <input
                                    id="expirationHours"
                                    type="text"
                                    defaultValue="0"
                                    { ...register('expirationHours', {
                                        validate: validatePositiveInteger,
                                        onChange: (e) => setValue('expirationHours', formatAmount(e.target.value)),
                                    }) }
                                    className="mt-1 p-2 w-16 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-main-bg text-white p-2 rounded disabled:opacity-50"
                        disabled={ !isValid || !account }
                    >
                        Make Request
                    </button>
                </div>

                <div>
                    <div className="mb-4">
                        <p className="mb-2 text-gray-700">
                            <ul>
                                <li>
                                    <b>Custody:</b> Your Bitcoin will always remain under your control until you decide to make
                                    a transaction.
                                </li>
                                <li className="mt-3">
                                    <b>Transparency:</b> The Bitcoin address you provide will be publicly visible, allowing
                                    users to verify it on the blockchain Explorer.
                                </li>
                                <li className="mt-3">
                                    <b>Monitor Bids:</b> Regularly check the platform for new bids. When you find an
                                    offer that meets your expectations, you can accept it.
                                </li>
                                <li className="mt-3">
                                    <b>Escrow Security:</b> Upon acceptance of a bid, the counterparty’s
                                    Ethereum-based tokens will be secured in an escrow Smart Contract.
                                </li>
                                <li className="mt-3">
                                    <b>Secure Exchange:</b> Once you transfer the agreed Bitcoin amount to the
                                    counterparty, the escrow will release the tokens to you.
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </form>
);
};

export default Request;
