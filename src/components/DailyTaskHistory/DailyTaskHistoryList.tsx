import React from 'react';
import { DailyTaskHistory } from 'components/type/DailyTaskHistory';
import styles from 'styles/DailyTaskHistoryList.module.css';
import DailyTaskHistoryItem from 'components/DailyTaskHistory/DailyTaskHistoryItem';


interface DailyTaskHistoryListProps {
    dailyTaskHistoryList: DailyTaskHistory[][];
    targetDate: Date;
    showDailyTaskHistoryDetailModal: (dailyTaskHistoryList: DailyTaskHistory[], doneDate: Date) => void;
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
