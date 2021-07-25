import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import { DailyTaskHistory } from '../common/interface';
import styles from '../../styles/DailyTaskHistoryList.module.css';
import DailyTaskHistoryItem from './DailyTaskHistoryItem';


interface DailyTaskHistoryListProps {
    dailyTaskHistoryList: DailyTaskHistory[][];
    targetDate: Date;
}

const DailyTaskHistoryList: React.FC<DailyTaskHistoryListProps> = (props) => {
 
    return (
        <div className={styles.daily_task_history_list}>
            {
                props.dailyTaskHistoryList.map((dailyTaskHistoryList, index) => {
                    let date = new Date(props.targetDate)
                    date.setDate(props.targetDate.getDate() - index)

                    return (<DailyTaskHistoryItem
                        dailyTaskHistoryList={dailyTaskHistoryList}
                        key={"DailyTaskHistoryItem" + index}
                        date={date}
                    />)
                })
            }
        </div>
    )
}

export default DailyTaskHistoryList;