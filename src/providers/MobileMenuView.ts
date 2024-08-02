import { createContext } from 'react';

type MobileMenuViewType = {
	showMenu: boolean;
	setShowMenu: (showMenuUpdate: boolean) => void;
};

const MobileMenuView = createContext<MobileMenuViewType>({
	showMenu: false,
	setShowMenu: () => {},
});

export default MobileMenuView;
