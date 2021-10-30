import React from 'react';
import Head from 'next/head';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import BurgerMenu from 'components/common/BurgerMenu';

interface LayoutProps {
    title: string;
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div>
            <BurgerMenu width={250}/>
            <Head>
                <title>{props.title}</title>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Header title={props.title} />
            {props.children}
            <Footer footer="copyright shumiyat" />
        </div>
    )
}

export default Layout;
