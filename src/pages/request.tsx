import MetaMaskButton from "@/components/MetaMaskButton";
import { MetaMaskContext } from "@/components/MetaMaskContext";
import RFQABI from "@/contracts/RFQ.json";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./request.module.scss";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
		mode: "onChange",
		defaultValues: {
			amount: "1",
			expirationDays: "90",
			expirationHours: "0",
		},
	});
	const { account, web3 } = useContext(MetaMaskContext);
	const [requestCreated, setRequestCreated] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onSubmit = async (data: FormData) => {
		// Clear the error message when submit is hit again
		setErrorMessage(null);

		if (!web3 || !account) {
			console.error("MetaMask is not connected");
			return;
		}

		const contract = new web3.eth.Contract(RFQABI.abi, CONTRACT_ADDRESS);
		const expiryInSeconds =
			Number.parseInt(data.expirationDays) * 86400 +
			Number.parseInt(data.expirationHours) * 3600;

		try {
			let bitcoinAddressHex = web3.utils
				.asciiToHex(data.bitcoinAddress)
				.slice(2);
			if (bitcoinAddressHex.length > 50) {
				bitcoinAddressHex = bitcoinAddressHex.slice(0, 50);
			} else if (bitcoinAddressHex.length < 50) {
				bitcoinAddressHex = bitcoinAddressHex.padEnd(50, "0");
			}
			bitcoinAddressHex = `0x${bitcoinAddressHex}`;

			const amountInSatoshis = (
				Number.parseFloat(data.amount) * 100000000
			).toString();

			console.log("Bitcoin Address (Hex):", bitcoinAddressHex);
			console.log("Amount (Satoshis):", amountInSatoshis);
			console.log(
				"Expiration Time:",
				Math.floor(Date.now() / 1000) + expiryInSeconds,
			);

			const tx = await contract.methods
				.makeRequest(
					bitcoinAddressHex,
					amountInSatoshis,
					Math.floor(Date.now() / 1000) + expiryInSeconds,
				)
				.send({ from: account });
			console.log("Request created successfully:", tx);
			setRequestCreated(true);
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage("Error creating request");
			}
			console.error("Error creating request:", error);
		}
	};

	const validateBitcoinAddress = (address: string): string | boolean => {
		const re = /^(1|3|bc1|tb1)[a-zA-HJ-NP-Z0-9]{25,62}$/;
		return re.test(address) || "Invalid Bitcoin address format";
	};

	const formatAmount = (value: string): string => {
		return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
	};

	const validatePositiveInteger = (value: string): string | boolean => {
		const number = Number(value);
		return (
			(Number.isInteger(number) && number >= 0) || "Must be a positive integer"
		);
	};

	return (
		<div>
			{errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
			{requestCreated ? (
				<div className="text-2xl flex items-center">
					<FontAwesomeIcon
						icon={faCheckCircle}
						className="text-green-500 mr-2"
					/>
					Request created successfully!
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<h1 className={styles.h1}>Request for Quote</h1>
					<h3 className={styles.h3}>
						Offer your BTC for Ethereum-based assets
					</h3>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
						<div>
							<div className="mb-6 flex items-center justify-between">
								<div className="flex-grow">
									<label
										htmlFor="ethereumAddress"
										className="block text-gray-500 text-sm"
									>
										Ethereum Address (for receiving tokens)
									</label>
									{account ? (
										<input
											id="ethereumAddress"
											type="text"
											value={account}
											readOnly
											className="mt-1 p-2 w-full border rounded bg-gray-100 cursor-not-allowed"
										/>
									) : (
										<MetaMaskButton linkStyle />
									)}
								</div>
							</div>

							<div className="mb-6">
								<label
									htmlFor="bitcoinAddress"
									className="block text-gray-500 text-sm"
								>
									Bitcoin Address (to sell from)
								</label>
								<input
									id="bitcoinAddress"
									type="text"
									{...register("bitcoinAddress", {
										validate: validateBitcoinAddress,
									})}
									className="mt-1 p-2 w-full border rounded"
								/>
								{errors.bitcoinAddress && (
									<span className="text-red-500">
										{errors.bitcoinAddress.message}
									</span>
								)}
							</div>

							<div className="mb-6">
								<label htmlFor="amount" className="block text-gray-500 text-sm">
									Amount of BTC to sell
								</label>
								<input
									id="amount"
									type="text"
									{...register("amount", {
										onChange: (e) => {
											setValue("amount", formatAmount(e.target.value));
										},
										validate: (value) =>
											!Number.isNaN(Number(value)) || "Invalid amount format",
									})}
									className="mt-1 p-2 w-full border rounded"
								/>
								{errors.amount && (
									<span className="text-red-500">{errors.amount.message}</span>
								)}
							</div>

							<div className="mb-6">
								<label className="block text-gray-500 text-sm">
									Request Expiration
								</label>
								<div className="flex space-x-2">
									<div className="flex items-center">
										<label
											htmlFor="expirationDays"
											className="block text-gray-500 text-sm mr-2"
										>
											Days:
										</label>
										<input
											id="expirationDays"
											type="text"
											{...register("expirationDays", {
												validate: validatePositiveInteger,
												onChange: (e) =>
													setValue(
														"expirationDays",
														formatAmount(e.target.value),
													),
											})}
											className="mt-1 p-2 w-16 border rounded"
										/>
										{errors.expirationDays && (
											<span className="text-red-500">
												{errors.expirationDays.message}
											</span>
										)}
									</div>
									<div className="flex items-center">
										<label
											htmlFor="expirationHours"
											className="block text-gray-500 text-sm mr-2"
										>
											Hours:
										</label>
										<input
											id="expirationHours"
											type="text"
											{...register("expirationHours", {
												validate: validatePositiveInteger,
												onChange: (e) =>
													setValue(
														"expirationHours",
														formatAmount(e.target.value),
													),
											})}
											className="mt-1 p-2 w-16 border rounded"
										/>
										{errors.expirationHours && (
											<span className="text-red-500">
												{errors.expirationHours.message}
											</span>
										)}
									</div>
								</div>
							</div>

							<button
								type="submit"
								className="w-full bg-main-bg text-white p-2 rounded disabled:opacity-50"
								disabled={!isValid || !account}
							>
								Make Request
							</button>
						</div>

						<div>
							<div className="mb-4">
								<div className="mb-2 text-gray-700">
									<ul>
										<li>
											<b>Custody:</b> Your Bitcoin will always remain under your
											control until you decide to make a transaction.
										</li>
										<li className="mt-3">
											<b>Transparency:</b> The Bitcoin address you provide will
											be publicly visible, allowing users to verify it on the
											blockchain Explorer.
										</li>
										<li className="mt-3">
											<b>Monitor Bids:</b> Regularly check the platform for new
											bids. When you find an offer that meets your expectations,
											you can accept it.
										</li>
										<li className="mt-3">
											<b>Escrow Security:</b> Upon acceptance of a bid, the
											counterparty’s Ethereum-based tokens will be secured in an
											escrow Smart Contract.
										</li>
										<li className="mt-3">
											<b>Secure Exchange:</b> Once you transfer the agreed
											Bitcoin amount to the counterparty, the escrow will
											release the tokens to you.
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default Request;
