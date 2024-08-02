import MobileMenuView from "@/providers/MobileMenuView";
import { faBitcoin, faReadme } from "@fortawesome/free-brands-svg-icons";
import { faDashboard, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import type React from "react";
import { useContext } from "react";
import styles from "./Menu.module.scss";

interface MenuProps {
	className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
	const router = useRouter();
	const { setShowMenu } = useContext(MobileMenuView);

	const isActive = (path: string) => router.pathname === path;

	return (
		<nav
			onClick={() => setShowMenu(false)}
			className={`${styles.menu} ${className}`}
		>
			<ul>
				<li className={isActive("/") ? styles.active : ""}>
					<Link href="/" className={isActive("/") ? styles.active : ""}>
						<FontAwesomeIcon icon={faDashboard} className="me-2 text-main-bg" />
						Dashboard
					</Link>
				</li>
				<li className={isActive("/request") ? styles.active : ""}>
					<Link
						href="/request"
						className={isActive("/request") ? styles.active : ""}
					>
						<FontAwesomeIcon icon={faBitcoin} className="me-2 text-main-bg" />
						Request for&nbsp;Quote
					</Link>
				</li>
				<li className={isActive("/list") ? styles.active : ""}>
					<Link href="/list" className={isActive("/list") ? styles.active : ""}>
						<FontAwesomeIcon icon={faListAlt} className="me-2 text-main-bg" />
						Active Requests
					</Link>
				</li>
				<li className={isActive("/faq") ? styles.active : ""}>
					<Link href="/faq" className={isActive("/faq") ? styles.active : ""}>
						<FontAwesomeIcon icon={faReadme} className="me-2 text-main-bg" />
						F. A. Q.
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
