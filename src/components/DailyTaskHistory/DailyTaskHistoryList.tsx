import React from 'react';
import { DailyTaskHistory } from '../common/interface';
import styles from '../../styles/DailyTaskHistoryList.module.css';
import DailyTaskHistoryItem from './DailyTaskHistoryItem';


interface DailyTaskHistoryListProps {
    dailyTaskHistoryList: DailyTaskHistory[][];
    targetDate: Date;
    showDailyTaskHistoryDetailModal: (dailyTaskHistoryList: DailyTaskHistory[]) => void;
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
                        showDailyTaskHistoryDetailModal={props.showDailyTaskHistoryDetailModal}
                    />)
                })
            }
        </div>
    )
}

export default DailyTaskHistoryList;