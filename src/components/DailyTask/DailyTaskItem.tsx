import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import styles from '../../styles/DailyTaskItem.module.css';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { DailyTask } from '../common/interface';
import * as NumberUtil from '../util/NumberUtil';
import * as ConversionUtil from '../util/ConversionUtil';
import {getApiClient} from '../util/AuthenticationUtil';
import Router from 'next/router';

interface DailyTaskItemProps {
    dailyTask: DailyTask;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showDailyTaskEditModal: (DailyTask) => void;
}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {
    const [inputDoneTime, setInputDoneTime] = useState<string>("");

    const quota = NumberUtil.convertHourMinute(props.dailyTask.quota);
    const done = NumberUtil.convertHourMinute(props.dailyTask.doneTime);
    const remaining = NumberUtil.convertRemaining(props.dailyTask.quota, props.dailyTask.doneTime);

    const taskStatus = ConversionUtil. conversionStatusByTime(props.dailyTask.quota, props.dailyTask.doneTime, props.dailyTask.deleteFlg);
    var taskStatusStr = props.dailyTask.deleteFlg == 1 ? "【" + taskStatus.str + "】" : "";
    var taskStatusColor = taskStatus.color;

    // cookieを使用するaxios生成
    let client = getApiClient();

    const saveDoneTime = () => {

        if (!NumberUtil.isNumber(inputDoneTime)) {
            setInputDoneTime("");
            return;
        }

        var params = {
            daily_task_id: props.dailyTask.id,
            done_time: inputDoneTime,
            quota: props.dailyTask.quota,
        }
        var jsonParams = JSON.stringify(params);

        setInputDoneTime("")

        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then(() => {
            props.setInitDispFlg(true);
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    const handleChangeInputDoneTime = () => {
        return e => {
            setInputDoneTime(e.target.value);
        };
    }

    const deleteDailyTask = (e) => {
        if(confirm("Do you want to delete it?")){
            client.delete(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_DAILY_TASK + "/" + props.dailyTask.id)
            .then( () => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/Error?400');
            })
        }
        e.stopPropagation();
    }

    return (
        <div className={styles.daily_task_item + " " + taskStatusColor}>
            <div className={styles.title} onClick={ () => props.showDailyTaskEditModal(props.dailyTask)}>
                {props.dailyTask.title}{taskStatusStr}
                {props.dailyTask.deleteFlg == 1 && 
                    <p className={styles.icon}><i onClick={deleteDailyTask} className="fa fa-trash faa-wrench animated-hover" /></p> 
                }
            </div>
            <Row>
                <Col xs={2} className={styles.quota_label}>Quota: {quota}</Col>
                <Col xs={2} className={styles.label}>Done: {done}</Col>
                <Col xs={3} className={styles.label}>Remaining: {remaining}</Col>
                <Col xs={5}>
                    logged:
                    <Form.Control type="text" value={inputDoneTime} className={styles.done_time_textbox} onChange={handleChangeInputDoneTime()} disabled={props.dailyTask.deleteFlg == 1} /> m
                    <Button variant="primary" className={styles.done_time_button} onClick={saveDoneTime}>Done</Button>
                </Col>
            </Row>
            
        </div>
    )
}

export default DailyTaskItem;