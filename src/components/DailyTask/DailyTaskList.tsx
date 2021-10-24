import React, { Dispatch, SetStateAction} from 'react';
import DailyTaskItem from './DailyTaskItem';
import styles from 'styles/DailyTaskList.module.css';
import {DailyTask} from 'components/type/DailyTask';

interface DailyTaskListProps {
    dailyTaskList: DailyTask[];
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showDailyTaskEditModal: (dailyTask: DailyTask) => void;
}

const DailyTaskList: React.FC<DailyTaskListProps> = (props) => {

    let count = 0;
    return (
        <div className={styles.daily_task_list}>
                        {
                props.dailyTaskList.map(dailyTask => {
                    count += 1;
                    return (
                    <DailyTaskItem
                        dailyTask={dailyTask}
                        setInitDispFlg={props.setInitDispFlg}
                        key={"DailyTaskItem" + dailyTask.id}
                        showDailyTaskEditModal={props.showDailyTaskEditModal}
                        order={count}
                    />)
                    })
            }
        </div>
    )
}

export default DailyTaskList;
