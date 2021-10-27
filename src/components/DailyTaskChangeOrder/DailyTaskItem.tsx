import {DailyTask} from 'components/type/DailyTask';
import { Dispatch, SetStateAction} from 'react';


interface DailyTaskItemProps {
  dailyTask: DailyTask;
  setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
  order: number;
}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {

  return (
      <>
        {props.dailyTask.id}
      </>
  )
}

export default DailyTaskItem;
