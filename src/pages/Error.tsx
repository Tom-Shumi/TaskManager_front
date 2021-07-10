import React from 'react';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import { useState } from "react";
import dynamic from "next/dynamic";
import {logout} from '../components/util/AuthenticationUtil';

const getErrorCd = (): String => {
    return window.location.search.substring(1);
}

const Error: React.FC = () => {
    const [errorCd] = useState<String>(getErrorCd());
    let errorMsg: String;
    switch (errorCd) {
        case "400":
            errorMsg = "不正なリクエストです。";
            break;
        case "401":
            errorMsg = "認証に失敗しました。";
            break;
        default:
            errorMsg = "エラーが発生しました。";
            break;
    }
    return (
        <Layout title="Error.">
            {errorMsg}
            <br /><br />
            <a onClick={logout} className="cursor_pointer">＜＜ Back to login page</a>
        </Layout>
    )
}

const DynamicError = dynamic(
    {
      loader: async () => Error,
    },
    { ssr: false }
  );
export default DynamicError;