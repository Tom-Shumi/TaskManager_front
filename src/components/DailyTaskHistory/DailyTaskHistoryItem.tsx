import React from 'react';
import { DailyTaskHistory } from '../common/interface';
import styles from '../../styles/DailyTaskHistoryItem.module.css';
import {Row, Col} from 'react-bootstrap';
import * as DatePickerUtil from '../util/DatePickerUtil';
import * as NumberUtil from '../util/NumberUtil';



interface DailyTaskHistoryItemProps {
    dailyTaskHistoryList: DailyTaskHistory[];
    date: Date;
    showDailyTaskHistoryDetailModal: (dailyTaskHistoryList: DailyTaskHistory[], doneDate: Date) => void;
}

const DailyTaskHistoryItem: React.FC<DailyTaskHistoryItemProps> = (props) => {

    let doneTaskCount = 0;
    let totalDoneTime = 0;

    for (var i = 0 ; i < props.dailyTaskHistoryList.length ; i++) {
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
        <div className={styles.daily_task_history_item + statusColor} onClick={ () => props.showDailyTaskHistoryDetailModal(props.dailyTaskHistoryList, props.date)}>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={2} >{DatePickerUtil.dateStrDelimiterYYYYMMDD(props.date)}</Col>
                <Col xs={3} >Achievement: {doneTaskCount} of {props.dailyTaskHistoryList.length}</Col>
                <Col xs={6} >Total Done Time: {NumberUtil.convertHourMinute(totalDoneTime)}</Col>
            </Row>
        </div>
    )
}

export default DailyTaskHistoryItem;
