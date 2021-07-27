import React from 'react';
import styles from '../../styles/DailyTaskHistoryDetailItem.module.css';
import {Row, Col} from 'react-bootstrap';
import * as NumberUtil from '../util/NumberUtil';
import { DailyTaskHistory } from '../common/interface';

interface DailyTaskHistoryDetailItemProps {
    dailyTaskHistory: DailyTaskHistory;
}

const DailyTaskHistoryDetailItem: React.FC<DailyTaskHistoryDetailItemProps> = (props) => {
    
    const quota = NumberUtil.convertHourMinute(props.dailyTaskHistory.quota);
    const done = NumberUtil.convertHourMinute(props.dailyTaskHistory.doneTime);
    const remaining = NumberUtil.convertRemaining(props.dailyTaskHistory.quota, props.dailyTaskHistory.doneTime);

    var taskStatusStr = props.dailyTaskHistory.doneFlg == 1 ? "【 DONE 】" : "";

    let statusColor = "";
    if (props.dailyTaskHistory.doneFlg == 1) {
        statusColor = " yellow"
    }

    return (
        <div className={styles.daily_task_history_detail_item + statusColor}>
            <div className={styles.title}>
                {props.dailyTaskHistory.title} {taskStatusStr}
            </div>
            <Row>
                <Col xs={4} className={styles.quota_label}>Quota: {quota}</Col>
                <Col xs={3} className={styles.label}>Done: {done}</Col>
                <Col xs={5} className={styles.label}>Remaining: {remaining}</Col>
            </Row>
            
        </div>
    )
}

export default DailyTaskHistoryDetailItem;