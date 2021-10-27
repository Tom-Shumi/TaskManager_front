import { useState, useEffect } from 'react';
import styles from 'styles/DailyTaskList.module.css';
import DailyTaskItem from 'components/DailyTaskChangeOrder/DailyTaskItem';
import { DailyTask } from 'components/type/DailyTask';
import * as DailyTaskUtil from 'components/type/DailyTask';
import {getApiClient} from 'components/util/AuthenticationUtil';
import * as Util from 'components/util/Util';
import Router from 'next/router';

const DailyTaskList: React.FC = () => {
  const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);
  const [dailyTaskList, setDailyTaskList] = useState<DailyTask[]>([]);

  useEffect(() => {
    setInitDispFlg(false);
    callGetDailyTaskList();
  }, [initDispFlg]);

  const callGetDailyTaskList = () => {
    var res: Promise<DailyTask[]> = fetchDailyTaskList();
    res.then(ret => {
        setDailyTaskList(ret);
    });
}

  let count = 0;
  return (
    <div className={styles.dailyTaskList}>
      {
        dailyTaskList.map(dailyTask => {
          count += 1;
          return (
            <DailyTaskItem
              dailyTask={dailyTask}
              setInitDispFlg={setInitDispFlg}
              order={count}
              key={"DailyTaskItem" + dailyTask.id}
            />
        )})
      }
    </div>
  )
}

async function fetchDailyTaskList() {
  try {
    const res = await getApiClient().get(Util.env(`${process.env.NEXT_PUBLIC_API_DAILY_TASK_PLAIN}`));

    return createDailyTaskList(res.data);
  } catch(error){
    Router.push('/');
    return [];
  }
}

function createDailyTaskList(responseData: any[]): DailyTask[]{
  let length: number = responseData.length;
  var dailyTaskList :DailyTask[] = [];

  for (var i = 0 ; i < length ; i++) {
    dailyTaskList.push(DailyTaskUtil.of(responseData[i]));
  }

  return dailyTaskList;
}

export default DailyTaskList;
