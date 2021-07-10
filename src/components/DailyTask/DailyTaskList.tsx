import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import DailyTaskItem from './DailyTaskItem';
import styles from '../../styles/DailyTaskList.module.css';

interface DailyTaskListProps {

}

const DailyTaskList: React.FC<DailyTaskListProps> = (props) => {
 
    return (
        <div className={styles.daily_task_list}>
            <DailyTaskItem key={"DailyTaskItem1"} />
        </div>
    )
}

export default DailyTaskList;