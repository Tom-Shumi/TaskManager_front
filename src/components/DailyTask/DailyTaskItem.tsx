import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import styles from '../../styles/DailyTaskItem.module.css';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { DailyTask } from '../common/interface';
import * as NumberUtil from '../util/NumberUtil';
import * as ConversionUtil from '../util/ConversionUtil';

interface DailyTaskItemProps {
    dailyTask: DailyTask;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {

    const quota = NumberUtil.convertHourMinute(props.dailyTask.quota);
    const done = NumberUtil.convertHourMinute(props.dailyTask.doneTime);
    const remaining = NumberUtil.convertRemaining(props.dailyTask.quota, props.dailyTask.doneTime);

    const taskStatus = ConversionUtil. conversionStatusByTime(props.dailyTask.quota, props.dailyTask.doneTime);
    var taskStatusStr = taskStatus.str;
    var taskStatusColor = taskStatus.color;
 
    return (
        <div className={styles.daily_task_item + " " + taskStatusColor}>
            <div className={styles.title}>{props.dailyTask.title} [ {taskStatusStr} ]</div>
            <Row>
                <Col xs={2} className={styles.quota_label}>Quota: {quota}</Col>
                <Col xs={2} className={styles.label}>Done: {done}</Col>
                <Col xs={3} className={styles.label}>Remaining: {remaining}</Col>
                <Col xs={5}>
                    logged:
                    <Form.Control type="text" className={styles.done_time_textbox}/> m
                    <Button variant="primary" className={styles.done_time_button}>Done</Button>
                </Col>
            </Row>
            
        </div>
    )
}

export default DailyTaskItem;