import React from 'react';
import Link from 'next/link';
import { slide as Menu } from "react-burger-menu";

interface MenuProps {
    width: number;
}

const BurgerMenu: React.FC<MenuProps> = (props) => {

    return (
        <Menu {...props}>
            <Link href="/Task">
                <a className="burger_menu_link">Task page</a>
            </Link>
            <Link href="/DailyTask">
                <a className="burger_menu_link">Daily Task page</a>
            </Link>
            <Link href="/WeeklyTask">
                <a className="burger_menu_link">Weekly Tasks page</a>
            </Link>
        </Menu>
    )
}

  export default BurgerMenu;