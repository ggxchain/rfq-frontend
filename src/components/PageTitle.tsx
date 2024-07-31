import { TableView } from "@/components/TableView";
import { ListView } from "@/components/listView";
import type { TitleProps } from "@/types/title";
import { View } from "@/types/view";
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
						<ListView />
					</div>
					<div
						onClick={() => setView(View.table)}
						className={`${styles.viewIcon} ${activeView === View.table && styles.active}`}
					>
						<TableView />
					</div>
				</>
			)) || <h1 className={styles.h1}>{children}</h1>}
		</div>
	);
};

export default PageTitle;
