import React, { useState } from 'react';
import Layout from 'components/common/Layout';
import {authentication} from 'components/util/AuthenticationUtil';
import {Button} from 'react-bootstrap';
import DailyTaskHistoryBoard from 'components/DailyTaskHistory/DailyTaskHistoryBoard';
import DailyTaskHistoryDetailModal from 'components/DailyTaskHistory/DailyTaskHistoryDetailModal';
import Link from 'next/link';
import { DailyTaskHistory as DailyTaskHistoryClass } from 'components/type/DailyTaskHistory';
import dynamic from "next/dynamic";

const DailyTaskHistory: React.FC = () => {
  // 初期表示フラグ
  const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);
  // 基準日
  const [targetDate, _] = useState<Date>(new Date());
  // 基準日からの差分
  const [targetDateDiff, setTargetDateDiff] = useState<number>(0);
  // デイリータスク履歴詳細モーダル表示フラグ
  const [dailyTaskHistoryDetailModalDispFlg, setDailyTaskHistoryDetailModalDispFlg] = useState<Boolean>(false);
  // 編集対象デイリータスク
  const [targetDailyTaskHistoryList, setTargetDailyTaskHistoryList] = useState<DailyTaskHistoryClass[]>([]);
  // DoneTime登録漏れした際の応急措置処理用の日付
  const [targetDoneDate, setTargetDoneDate] = useState<Date>(new Date());

  authentication();

  const showDailyTaskHistoryDetailModal = (dailyTaskHistoryList: DailyTaskHistoryClass[], doneDate: Date) => {
    setTargetDailyTaskHistoryList(dailyTaskHistoryList);
    setTargetDoneDate(doneDate);
    setDailyTaskHistoryDetailModalDispFlg(true);
  }

  const closeDailyTaskHistoryDetailModal = () => {
    setDailyTaskHistoryDetailModalDispFlg(false);
  }

  return (
      <Layout title="Daily Task History">
        <Link href="/DailyTask">
          <Button key="dailyTaskBoard" variant="success" className="buttonLg">＜ Daily Task Board</Button>
        </Link>
        <DailyTaskHistoryBoard
          initDispFlg = {initDispFlg}
          setInitDispFlg = {setInitDispFlg}
          targetDate= {targetDate}
          targetDateDiff= {targetDateDiff}
          setTargetDateDiff= {setTargetDateDiff}
          showDailyTaskHistoryDetailModal = {showDailyTaskHistoryDetailModal}
        />

        {dailyTaskHistoryDetailModalDispFlg &&
          <DailyTaskHistoryDetailModal
            close = {closeDailyTaskHistoryDetailModal}
            dailyTaskHistoryList = {targetDailyTaskHistoryList}
            doneDate = {targetDoneDate}
            setInitDispFlg = {setInitDispFlg}
          />
        }
      </Layout>
    )
}

const DynamicDailyTaskHistory = dynamic(
  {
    loader: async () => DailyTaskHistory,
  },
  { ssr: false }
);

export default DynamicDailyTaskHistory;
