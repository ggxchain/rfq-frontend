import type { View } from "@/types/view";
import type { JSX } from "react";
interface TitleProps {
	children: string | JSX.Element | JSX.Element[];
	activeView: View;
	setView: (view: View) => void;
}

export type { TitleProps };
