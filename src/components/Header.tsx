import MobileMenuView from "@/providers/MobileMenuView";
import type React from "react";
import { useContext } from "react";
import styles from "./Header.module.scss";
import MetaMaskButton from "./MetaMaskButton";
import ThreeDotsImage from "./ThreeDots";
const Header: React.FC = () => {
	const { showMenu, setShowMenu } = useContext(MobileMenuView);
	return (
		<header className={styles.header}>
			<div className={styles.leftContainer}>
				<div className={styles.logoHeadingContainer}>
					<img src="/logo.svg" alt="logo" className={styles.logo} />
					<h1 className={styles.heading}>RFQ</h1>
				</div>
				<p className={styles.subText}>
					Non-Custodial Request
					<br />
					for Quote Platform
				</p>
				<button
					onClick={() => setShowMenu(!showMenu)}
					type="button"
					className="inline-flex items-center p-2 rounded-lg lg:hidden"
				>
					<ThreeDotsImage />
				</button>
			</div>
			<MetaMaskButton />
		</header>
	);
};

export default Header;
