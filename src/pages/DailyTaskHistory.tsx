import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import {authentication} from '../components/util/AuthenticationUtil';
import {Button} from 'react-bootstrap';
import DailyTaskHistoryBoard from '../components/DailyTaskHistory/DailyTaskHistoryBoard';
import DailyTaskHistoryDetailModal from '../components/DailyTaskHistory/DailyTaskHistoryDetailModal';
import Link from 'next/link';
import { DailyTaskHistory as DailyTaskHistoryClass } from '../components/common/interface';
import dynamic from "next/dynamic";

const DailyTaskHistory: React.FC = () => {
  // 基準日
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  // 基準日からの差分
  const [targetDateDiff, setTargetDateDiff] = useState<number>(0);
  // デイリータスク履歴詳細モーダル表示フラグ
  const [dailyTaskHistoryDetailModalDispFlg, setDailyTaskHistoryDetailModalDispFlg] = useState<Boolean>(false);
  // 編集対象デイリータスク
  const [targetDailyTaskHistoryList, setTargetDailyTaskHistoryList] = useState<DailyTaskHistoryClass[]>([]);

  authentication();

  const showDailyTaskHistoryDetailModal = (dailyTaskHistoryList: DailyTaskHistoryClass[]) => {
    setTargetDailyTaskHistoryList(dailyTaskHistoryList);
    setDailyTaskHistoryDetailModalDispFlg(true);
  }

  const closeDailyTaskHistoryDetailModal = () => {
    setDailyTaskHistoryDetailModalDispFlg(false);
  }

  return (
      <Layout title="Daily Task History.">
        <Link href="/DailyTask">
          <Button key="dailyTaskBoard" variant="success" className="button_lg">＜ Daily Task Board</Button>
        </Link>
        <DailyTaskHistoryBoard
          targetDate= {targetDate}
          targetDateDiff= {targetDateDiff}
          setTargetDateDiff= {setTargetDateDiff}
          showDailyTaskHistoryDetailModal = {showDailyTaskHistoryDetailModal}
        />

        {dailyTaskHistoryDetailModalDispFlg &&
          <DailyTaskHistoryDetailModal
            close = {closeDailyTaskHistoryDetailModal}
            dailyTaskHistoryList = {targetDailyTaskHistoryList}
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
