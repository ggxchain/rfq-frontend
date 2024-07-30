import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import type { AppProps } from "next/app";
import type React from "react";
import { useState } from "react";
import styles from "./_app.module.scss";
import "@/styles/globals.css";

import { MetaMaskProvider } from "@/components/MetaMaskContext";
import MobileMenuView from "@/providers/MobileMenuView";
import { isMobile } from "react-device-detect";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	const [showMenu, setShowMenu] = useState(false);
	console.log("*** App:", showMenu);
	console.log("*** isMobile:", isMobile);
	return (
		<MobileMenuView.Provider value={{ setShowMenu, showMenu }}>
			<MetaMaskProvider>
				<div className={styles.container}>
					<Header />
					<div className="flex flex-1 pb-10">
						<Menu
							className={`${
								isMobile
									? "fixed w-full top-14 left-0 transition-transform transparent p-safe-or-4 menu -translate-x-full lg:translate-x-0"
									: ""
							} ${showMenu ? " translate-x-0" : ""}`}
						/>
						<main className={styles.main}>
							<Component {...pageProps} />
						</main>
					</div>
					<Footer />
				</div>
			</MetaMaskProvider>
		</MobileMenuView.Provider>
	);
};

export default MyApp;
