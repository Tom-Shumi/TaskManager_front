import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import {authentication} from '../components/util/AuthenticationUtil';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import * as DatePickerUtil from '../components/util/DatePickerUtil';
import DailyTaskHistoryBoard from '../components/DailyTaskHistory/DailyTaskHistoryBoard';
import { DailyTask as DailyTaskClass } from '../components/common/interface';
import DailyTaskEditModal from '../components/DailyTask/DailyTaskEditModal';
import Link from 'next/link';

const DailyTaskHistory: React.FC = () => {
  // 基準日
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  // 基準日からの差分
  const [targetDateDiff, setTargetDateDiff] = useState<number>(0);
 
    return (
        <Layout title="Daily Task History.">
          <Link href="/DailyTask">
            <Button key="dailyTaskBoard" variant="success" className="button_lg">＜ Daily Task Board</Button>
          </Link>
          <DailyTaskHistoryBoard
            targetDate= {targetDate}
            targetDateDiff= {targetDateDiff}
            setTargetDateDiff= {setTargetDateDiff}
          />
        </Layout>
    )
}

export default DailyTaskHistory;