import type { TitleProps } from "@/types/title";
import { View } from "@/types/view";
import { faRectangleList, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { isMobile } from "react-device-detect";
import styles from "./title.module.scss";

const PageTitle: React.FC<TitleProps> = ({ children, activeView, setView }) => {
	return (
		<div className={styles.titleBlock}>
			{(isMobile && (
				<>
					<h1 className={styles.h1}>{children}</h1>
					<div
						onClick={() => setView(View.view)}
						className={`${styles.viewIcon} ${activeView === View.view && styles.active}`}
					>
						<FontAwesomeIcon
							icon={faRectangleList}
							className={` ${activeView === View.view && "text-main-bg"}`}
						/>
					</div>
					<div
						onClick={() => setView(View.table)}
						className={`${styles.viewIcon} ${activeView === View.table && styles.active}`}
					>
						<FontAwesomeIcon
							icon={faTable}
							className={` ${activeView === View.table && "text-main-bg"}`}
						/>
					</div>
				</>
			)) || <h1 className={styles.h1}>{children}</h1>}
		</div>
	);
};

export default PageTitle;
