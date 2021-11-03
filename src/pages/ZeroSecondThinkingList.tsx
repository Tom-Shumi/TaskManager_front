import React, { useState} from 'react';
import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import List from "components/ZeroSecondThinkingList/List";

const ZeroSecondThinkingList: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleChangeSearchText = () => (e: any) => setSearchText(e.target.value);

  const search = () => {
    alert("TODO:" + searchText)
  }

  return (
    <Layout title="0秒思考">
      <Link href="/ZeroSecondThinking">
        <Button key="ZeroSecondThinking" variant="success" className="buttonMd marginSide10">0秒思考 実施</Button>
      </Link>
      <input type="text" value={searchText} onChange={handleChangeSearchText()} className="searchText" placeholder="テーマや内容を検索できます。"/>
      <Button key="ZeroSecondThinking" variant="primary" className="buttonMd marginSide10" onClick={() => search()}>検索</Button>
      <List />
    </Layout>
  )
}

export default ZeroSecondThinkingList;
