import React, { Dispatch, SetStateAction, useState} from 'react';
import styles from '../../styles/DailyTaskHistoryDetailItem.module.css';
import {Row, Col, Form, Button} from 'react-bootstrap';
import * as NumberUtil from '../util/NumberUtil';
import { DailyTaskHistory } from '../common/interface';
import {getApiClient} from '../util/AuthenticationUtil';
import Router from 'next/router';

interface DailyTaskHistoryDetailItemProps {
    dailyTaskHistory: DailyTaskHistory;
    doneDate: Date;
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const DailyTaskHistoryDetailItem: React.FC<DailyTaskHistoryDetailItemProps> = (props) => {
    const [inputDoneTime, setInputDoneTime] = useState<string>("");

    console.log(props.dailyTaskHistory)

    const quota = NumberUtil.convertHourMinute(props.dailyTaskHistory.quota);
    const done = NumberUtil.convertHourMinute(props.dailyTaskHistory.doneTime);
    const remaining = NumberUtil.convertRemaining(props.dailyTaskHistory.quota, props.dailyTaskHistory.doneTime);

    // cookieを使用するaxios生成
    let client = getApiClient();

    const handleChangeInputDoneTime = () => {
        return e => {
            setInputDoneTime(e.target.value);
        };
    }

    const saveDoneTime = () => {

        if (!NumberUtil.isNumber(inputDoneTime)) {
            setInputDoneTime("");
            return;
        }

        var params = {
            daily_task_id: props.dailyTaskHistory.dailyTaskId,
            done_time: inputDoneTime,
            quota: props.dailyTaskHistory.quota,
            done_date: props.doneDate
        }
        var jsonParams = JSON.stringify(params);

        setInputDoneTime("")

        // TODO post先変更すること！
        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY_REGISTER_LATER
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then(() => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    var taskStatusStr = props.dailyTaskHistory.doneFlg == 1 ? "【 DONE 】" : "";

    let statusColor = "";
    if (props.dailyTaskHistory.doneFlg == 1) {
        statusColor = " yellow"
    }

    return (
        <div className={styles.daily_task_history_detail_item + statusColor}>
            <div className={styles.title}>
                {props.dailyTaskHistory.title} {taskStatusStr}
                :[logged]
                    <Form.Control type="text" value={inputDoneTime} className={styles.done_time_textbox} onChange={handleChangeInputDoneTime()} /> m
                    <Button variant="primary" className={styles.done_time_button}  onClick={saveDoneTime}>Done</Button>
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
