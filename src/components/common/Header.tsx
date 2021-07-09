import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <Link href="/Task">
                <div className="cursor_pointer">Shumi Pro</div>
            </Link>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;