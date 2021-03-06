import React, { Dispatch, SetStateAction, useState} from 'react';
import styles from 'styles/DailyTaskItem.module.css';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {DailyTask} from 'components/type/DailyTask';
import * as NumberUtil from 'components/util/NumberUtil';
import * as ConversionUtil from 'components/util/ConversionUtil';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import {judgePcScreen} from 'components/util/Util';
import * as Util from 'components/util/Util';

interface DailyTaskItemProps {
    dailyTask: DailyTask;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showDailyTaskEditModal: (dailyTask: DailyTask) => void;
    order: number;
}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {
    const [inputDoneTime, setInputDoneTime] = useState<string>(props.dailyTask.quota.toString());

    const quota = NumberUtil.convertHourMinute(props.dailyTask.quota);
    const done = NumberUtil.convertHourMinute(props.dailyTask.doneTime);
    const remaining = NumberUtil.convertRemaining(props.dailyTask.quota, props.dailyTask.doneTime);

    const taskStatus = ConversionUtil.conversionStatusByTime(props.dailyTask.quota, props.dailyTask.doneTime, props.dailyTask.deleteFlg);
    let taskStatusStr = props.dailyTask.deleteFlg == 1 ? `【${taskStatus.str}】` : "";
    let taskStatusColor = taskStatus.color;

    const isOnlyPcScreen = judgePcScreen();

    // cookieを使用するaxios生成
    let client = getApiClient();

    const saveDoneTime = () => {

        if (!NumberUtil.isNumber(inputDoneTime)) {
            setInputDoneTime("");
            return;
        }

        let params = {
            dailyTaskId: props.dailyTask.id,
            doneTime: inputDoneTime,
            quota: props.dailyTask.quota,
        }
        let jsonParams = JSON.stringify(params);

        setInputDoneTime("")

        client.post(Util.env(process.env.NEXT_PUBLIC_API_SERVER) + Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY)
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then(() => {
            props.setInitDispFlg(true);
        }).catch(() => {
            Router.push('/');
        })
    }

    const handleChangeInputDoneTime = () => {
        return (e: any) => {
            setInputDoneTime(e.target.value);
        };
    }

    const deleteDailyTask = (e: any) => {
        if(confirm("Do you want to delete it?")){
            client.delete(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK)}/${props.dailyTask.id}`)
            .then( () => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/');
            })
        }
        e.stopPropagation();
    }

    return (
        <div className={styles.dailyTaskItem + " " + taskStatusColor}>
            <div className={styles.title} onClick={ () => props.showDailyTaskEditModal(props.dailyTask)}>
                {props.dailyTask.title}{taskStatusStr}
                {props.dailyTask.deleteFlg == 1 &&
                    <p className={styles.icon}><i onClick={deleteDailyTask} className="fa fa-trash faa-wrench animated-hover" /></p>
                }
            </div>
            <Row className={styles.row}>
                {isOnlyPcScreen && <Col md={2} className={styles.label}>Quota: {quota}</Col>}
                <Col xs={12} md={2} className={styles.label}>Done: {done}</Col>
                <Col xs={12} md={3} className={styles.label}>Remaining: {remaining}</Col>
                <Col xs={12} md={5}>
                    logged:
                    <Form.Control type="text" value={inputDoneTime} className={styles.doneTimeTextbox} onChange={handleChangeInputDoneTime()} disabled={props.dailyTask.deleteFlg == 1} /> m
                    <Button variant="primary" className={styles.doneTimeButton} onClick={saveDoneTime}>Done</Button>
                </Col>
            </Row>
        </div>
    )
}

export default DailyTaskItem;
