import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import { DailyTaskHistory } from '../common/interface';
import styles from '../../styles/DailyTaskHistoryItem.module.css';
import {Row, Col, Form, Button} from 'react-bootstrap';
import * as DatePickerUtil from '../util/DatePickerUtil';



interface DailyTaskHistoryItemProps {
    dailyTaskHistoryList: DailyTaskHistory[];
    date: Date;
}

const DailyTaskHistoryItem: React.FC<DailyTaskHistoryItemProps> = (props) => {

    return (
        <div className={styles.daily_task_history_item}>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={2} >{DatePickerUtil.dateStrDelimiterYYYYMMDD(props.date)}</Col>
                <Col xs={3} >Achievement: 1 of 5</Col>
                <Col xs={6} >Total Done Time: 120 m</Col>
            </Row>
        </div>
    )
}

export default DailyTaskHistoryItem;