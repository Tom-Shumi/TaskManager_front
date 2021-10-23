import Link from 'next/link';
import {logout} from 'components/util/AuthenticationUtil';
import { slide as Menu } from "react-burger-menu";
import {judgePcScreen, judgeSpScreen} from 'components/util/Util';

interface MenuProps {
    width: number;
}

const BurgerMenu: React.FC<MenuProps> = (props) => {

    const isOnlyPcScreen = judgePcScreen();
    const isOnlySpScreen = judgeSpScreen();

    return (
        <Menu {...props}>
            {isOnlyPcScreen && <Link href="/Task">
                <a className="burger_menu_link">Task page</a>
            </Link>}
            {isOnlySpScreen &&
                <a className="burger_menu_link">Task page(PC Only)</a>
            }

            <Link href="/DailyTask">
                <a className="burger_menu_link">Daily Task page</a>
            </Link>
            {/* <Link href="/WeeklyTask">
                <a className="burgerMenuLink">Weekly Tasks page</a>
            </Link> */}
            <a className="burger_menu_link_logout" onClick={logout} href="#">Logout</a>
        </Menu>
    )
}

export default BurgerMenu;
