import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';


const Error: React.FC = () => {
    return (
        <Layout title="Error.">
            エラーが発生しました。
            <Link href="/">
                <a>＜＜ Back to login page</a>
            </Link>
        </Layout>
    )
}

export default Error;