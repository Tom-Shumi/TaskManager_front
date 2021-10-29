import React from 'react';
import { DailyTaskHistory } from 'components/type/DailyTaskHistory';
import styles from 'styles/DailyTaskHistoryItem.module.css';
import {Row, Col} from 'react-bootstrap';
import * as DatePickerUtil from 'components/util/DatePickerUtil';
import * as NumberUtil from 'components/util/NumberUtil';



interface DailyTaskHistoryItemProps {
    dailyTaskHistoryList: DailyTaskHistory[];
    date: Date;
    showDailyTaskHistoryDetailModal: (dailyTaskHistoryList: DailyTaskHistory[], doneDate: Date) => void;
}

const DailyTaskHistoryItem: React.FC<DailyTaskHistoryItemProps> = (props) => {

    let doneTaskCount = 0;
    let totalDoneTime = 0;

    for (let i = 0 ; i < props.dailyTaskHistoryList.length ; i++) {
        if (props.dailyTaskHistoryList[i].doneFlg == 1) {
            doneTaskCount++;
        }
        totalDoneTime += props.dailyTaskHistoryList[i].doneTime
    }

    let statusColor = "";
    if (doneTaskCount == props.dailyTaskHistoryList.length && props.dailyTaskHistoryList.length != 0) {
        statusColor = " yellow"
    }

    return (
        <div className={styles.dailyTaskHistoryItem + statusColor} onClick={ () => props.showDailyTaskHistoryDetailModal(props.dailyTaskHistoryList, props.date)}>
            <Row className={styles.row}>
                <Col md={3} >{DatePickerUtil.dateStrDelimiterYYYYMMDD(props.date)}</Col>
                <Col md={3} >Achievement: {doneTaskCount} of {props.dailyTaskHistoryList.length}</Col>
                <Col md={6} >Total Done Time: {NumberUtil.convertHourMinute(totalDoneTime)}</Col>
            </Row>
        </div>
    )
}

export default DailyTaskHistoryItem;
