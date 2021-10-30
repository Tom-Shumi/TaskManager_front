import React, { useState } from 'react';
import Layout from 'components/common/Layout';
import {authentication} from 'components/util/AuthenticationUtil';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import * as DatePickerUtil from 'components/util/DatePickerUtil';
import DailyTaskBoard from 'components/DailyTask/DailyTaskBoard';
import { DailyTask as DailyTaskClass } from 'components/type/DailyTask';
import DailyTaskEditModal from 'components/DailyTask/DailyTaskEditModal';
import Link from 'next/link';
import {judgePcScreen} from 'components/util/Util';


const DailyTask: React.FC = () => {
    // 初期表示フラグ
    const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);
    // 合計タスク数
    const [totalTaskCount, setTotalTaskCount] = useState<number>(0);
    // 完了タスク数
    const [doneTaskCount, setDoneTaskCount] = useState<number>(0);
    // 合計Done時間
    const [totalDoneTime, setTotalDoneTime] = useState<string>("");
    // デイリータスク登録モーダル表示フラグ
    const [dailyTaskEditModalDispFlg, setDailyTaskEditModalDispFlg] = useState<Boolean>(false);
    // 編集対象デイリータスク
    const [targetDailyTask, setTargetDailyTask] = useState<DailyTaskClass | null>(null);
    // 削除済みタスクを含む
    const [includeDeleteFlg, setIncludeDeleteFlg] = useState<number>(0);

    const isOnlyPcScreen = judgePcScreen();

    authentication();

    const showDailyTaskEditModal = (dailyTask: DailyTaskClass | null) => {
      setTargetDailyTask(dailyTask);
      setDailyTaskEditModalDispFlg(true);
    }

    const closeDailyTaskEditModal = () => {
      setDailyTaskEditModalDispFlg(false);
    }

    const changeIncludeDeleteTask = () => {
      let flg = includeDeleteFlg == 0 ? 1 : 0
      return () => setIncludeDeleteFlg(flg);
    }

    return (
        <Layout title={DatePickerUtil.curentDateStrYYYYMMDD() + "."}>
          <Button key="create" variant="primary" className="buttonMd marginSide10" onClick={ () => showDailyTaskEditModal(null)}>Create Task</Button>
          {isOnlyPcScreen && (
            <Link href="/DailyTaskChangeOrder">
              <Button key="changeOrder" variant="info" className="buttonLg marginSide10">Change Task's Order</Button>
            </Link>)
          }
          <Link href="/DailyTaskHistory">
            <Button key="history" variant="success" className="buttonMd marginSide10">History ＞</Button>
          </Link>
          {isOnlyPcScreen && (
            <React.Fragment>
              <div className="displayInline marginSide10">Achievement: {doneTaskCount} of {totalTaskCount}</div>
              <div className="displayInline marginSide10">Total Done Time: {totalDoneTime}</div>
              <div className="displayInline marginSide10">
                <label>
                  <input type="checkbox" name="includeDeleteTask" id="includeDeleteTask" value={includeDeleteFlg} checked={includeDeleteFlg == 1} onChange={changeIncludeDeleteTask()} />
                  :Include Delete Task
                </label>
              </div>
            </ React.Fragment>)
          }

          <DailyTaskBoard
            initDispFlg = {initDispFlg}
            includeDeleteFlg = {includeDeleteFlg}
            setInitDispFlg = {setInitDispFlg}
            setTotalTaskCount = {setTotalTaskCount}
            setDoneTaskCount = {setDoneTaskCount}
            setTotalDoneTime = {setTotalDoneTime}
            showDailyTaskEditModal={showDailyTaskEditModal}
          />

          {dailyTaskEditModalDispFlg &&
            <DailyTaskEditModal
              close = {closeDailyTaskEditModal}
              setInitDispFlg = {setInitDispFlg}
              dailyTask = {targetDailyTask}
            />
          }
        </Layout>
    )
}

const DynamicTask = dynamic(
    {
      loader: async () => DailyTask,
    },
    { ssr: false }
  );

  export default DynamicTask;
