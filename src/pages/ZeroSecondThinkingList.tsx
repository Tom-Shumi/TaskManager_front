import React, {useState, useEffect, useRef} from 'react';
import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import List from 'components/ZeroSecondThinkingList/List';
import {ZeroSecondThinking} from 'components/type/ZeroSecondThinking';
import * as ZeroSecondThinkingUtil from 'components/type/ZeroSecondThinking';
import Router from 'next/router';
import {getApiClient} from 'components/util/AuthenticationUtil';
import * as Util from 'components/util/Util';

const ZeroSecondThinkingList: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [zeroSecondThinkingList, setZeroSecondThinkingList] = useState<ZeroSecondThinking[]>([]);
  const searchedText = useRef("");

    // 初期表示用
  useEffect(() => {
    callFetchZeroSecondThinkingList()
  }, []);

  const callFetchZeroSecondThinkingList = (searchText: string = "") => {
    const res: Promise<ZeroSecondThinking[]> = fetchZeroSecondThinkingList(searchText);
    res.then(ret => {
      setZeroSecondThinkingList(ret);
    });
  }

  async function fetchZeroSecondThinkingList(searchText: string): Promise<ZeroSecondThinking[]> {
    let condition = createSearchCondition(searchText);
    try {
      const res = await getApiClient().get(Util.env(`${process.env.NEXT_PUBLIC_API_ZERO_SECOND_THINKING}?${condition}`));
      return createZeroSecondThinkingList(res.data);
    } catch(error){
      Router.push('/');
      return [];
    }
  }

  const search = () => {
    callFetchZeroSecondThinkingList(searchText);
  }

  const loadNext = () => {
    if (zeroSecondThinkingList.length == 0) {
      return;
    }

    let maxId = zeroSecondThinkingList[zeroSecondThinkingList.length - 1].id
    let condition = createSearchCondition(searchText);
    condition = condition == "" ? "" : `&${condition}`
    try {
      getApiClient().get(Util.env(`${process.env.NEXT_PUBLIC_API_ZERO_SECOND_THINKING}?nextKey=${maxId}${condition}`))
      .then(res => {
        let addList = createZeroSecondThinkingList(res.data);
        setZeroSecondThinkingList([...zeroSecondThinkingList, ...addList])
      })
    } catch(error){
      Router.push('/');
    }
  }

  const createSearchCondition = (searchText: string) => {
    let condition = "";
    if (searchText != "") {
      searchedText.current = searchText;
      condition = `search=${searchText}`;
    }
    return condition;
  }

  const handleChangeSearchText = () => (e: any) => setSearchText(e.target.value);

  return (
    <Layout title="0秒思考">
      <Link href="/ZeroSecondThinking">
        <Button key="ZeroSecondThinking" variant="success" className="buttonMd marginSide10">0秒思考 実施</Button>
      </Link>
      <input type="text" value={searchText} onChange={handleChangeSearchText()} className="searchText" placeholder="テーマや内容を検索できます。"/>
      <Button key="ZeroSecondThinking" variant="primary" className="buttonMd marginSide10" onClick={() => search()}>検索</Button>
      <List
        key="list"
        zeroSecondThinkingList={zeroSecondThinkingList}/>
      <div className="nextLoadIcon" onClick={loadNext}><i className="fa fa-arrow-circle-down faa-wrench animated-hover" /></div>
    </Layout>
  )
}

export default ZeroSecondThinkingList;

const createZeroSecondThinkingList = (responseData: any[]) => {
  let length: number = responseData.length;
  let zeroSecondThinkingList :ZeroSecondThinking[] = [];

  for (let i = 0 ; i < length ; i++) {
    zeroSecondThinkingList.push(ZeroSecondThinkingUtil.of(responseData[i]));
  }

  return zeroSecondThinkingList;
}
