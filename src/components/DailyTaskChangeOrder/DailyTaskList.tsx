import { useState } from 'react';
import styles from 'styles/DailyTaskList.module.css';
import DailyTaskItem from 'components/DailyTaskChangeOrder/DailyTaskItem';
import { DailyTask } from 'components/type/DailyTask';

const DailyTaskList: React.FC = () => {
  const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);
  const [dailyTaskList, setDailyTaskList] = useState<DailyTask[]>([]);

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
              key={"DailyTaskItem" + dailyTask.id}
              order={count}
            />
        )})
      }
    </div>
  )
}

export default DailyTaskList;
