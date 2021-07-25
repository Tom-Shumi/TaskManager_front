import React, { Dispatch, SetStateAction} from 'react';
import DailyTaskItem from './DailyTaskItem';
import styles from '../../styles/DailyTaskList.module.css';
import { DailyTask } from '../common/interface';

interface DailyTaskListProps {
    dailyTaskList: DailyTask[];
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showDailyTaskEditModal: (DailyTask) => void;
}

const DailyTaskList: React.FC<DailyTaskListProps> = (props) => {
 
    return (
        <div className={styles.daily_task_list}>
                        {
                props.dailyTaskList.map(dailyTask => (
                    <DailyTaskItem
                        dailyTask={dailyTask}
                        setInitDispFlg={props.setInitDispFlg}
                        key={"DailyTaskItem" + dailyTask.id}
                        showDailyTaskEditModal={props.showDailyTaskEditModal}
                    />
                ))
            }
        </div>
    )
}

export default DailyTaskList;