import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import { Task } from 'components/type/Task';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import * as DatePickerUtil from 'components/util/DatePickerUtil';
import moment from 'moment';
import * as Util from 'components/util/Util';

registerLocale('ja', ja)


interface TaskEditModalProps {
    close: () => void;
    execSbt: string;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task | null;
}


const TaskEditModal: React.FC<TaskEditModalProps> = (props) => {
    const initDate = DatePickerUtil.nowUnixDate();
    const [form, setForm] = useState({id: -1, task: "", priority: 1, description: "", status: 1, date: initDate});
　　
    // 初期表示処理
    useEffect(() => {

        if (props.task != null) {
            let dateStr: string;
            if (props.task.status == 3) {
                dateStr = props.task.doneDate
            } else {
                dateStr = props.task.planDate
            }

            console.log(DatePickerUtil.parseUnixDate(dateStr))

            setForm({id: props.task.id
                    , task: props.task.taskTitle
                    , priority: props.task.priority
                    , description: props.task.description
                    , status: props.task.status
                    , date: DatePickerUtil.parseUnixDate(dateStr)});
        }
    }, []);

    // form入力のハンドリング
    // 日付を空欄には更新不可
    const handleChange = (input: string) => {
        return (e: any) => setForm({...form, [input]: e.target.value})
    }

    // form入力（日付）のハンドリング
    const handleChangeDate = (date: any) => {

        setForm({id: form.id
            , task: form.task
            , priority: form.priority
            , description: form.description
            , status: form.status
            , date: DatePickerUtil.parseUnixDate(date)});
    }

    // cookieを使用するaxios生成
    let client = getApiClient();

    // executeボタン押下処理
    const clickExecute = () => {
        execute();
    }

    // リクエスト用json取得
    const getJsonParams = () => {

        let params = {
            task: form.task,
            priority: form.priority,
            status: form.status,
            description: form.description,
            date: DatePickerUtil.parseRequestString(form.date)
        }

        return JSON.stringify(params);
    }

    // task登録
    const create = () => {
        let jsonParams = getJsonParams();

        client.post(Util.env(process.env.NEXT_PUBLIC_API_SERVER) + Util.env(process.env.NEXT_PUBLIC_API_TASK)
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( _ => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/');
        })
    }

    // task更新
    const update = () => {
        let jsonParams = getJsonParams();

        client.put(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK)}/${props.task!.id}`
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( _ => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/');
        })
    }

    // タイトル表示文字列設定
    let title: string = "";
    let execute: () => void;
    switch(props.execSbt) {
        case "1":
            title = 'Create task';
            execute = create;
            break;
        case "2":
            title = 'Update task';
            execute = update;
            break;
    }

    return (
        <Modal show={true} onHide={props.close} key='taskEditModal'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={4} className="modalLabel">
                            <strong>Task</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                                <Form.Control type="text" value={form.task} onChange={handleChange('task')} />
                        </Col>
                        <hr />
                        <Col xs={4} className="modalLabel">
                            <strong>Status</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                            <Form.Control as="select" value={form.status} onChange={handleChange('status')}>
                                <option key="status1" value="1">NOT STARTED</option>
                                <option key="status2" value="2">IN PROGRESS</option>
                                <option key="status3" value="3">DONE</option>
                            </Form.Control>
                        </Col>
                        <hr />
                        <Col xs={4} className="modalLabel">
                            <strong>Priority</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                            <Form.Control as="select" value={form.priority} onChange={handleChange('priority')}>
                                <option key="priority1" value="1">LOW</option>
                                <option key="priority2" value="2">MEDIUM</option>
                                <option key="priority3" value="3">HIGH</option>
                            </Form.Control>
                        </Col>
                        <hr />
                        <Col xs={4} className="modalLabel">
                            <strong>{form.status == 3 ? "Done Date" : "Plan Date"}</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                            <DatePicker
                                locale="ja"
                                selected={moment(form.date).toDate()}
                                onChange={handleChangeDate}
                                dateFormat="yyyy-MM-dd"
                                customInput={<Form.Control type="text"/>}
                            />
                        </Col>
                        <hr />
                        <Col xs={4} className="modalLabel">
                            <strong>Description</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                                <Form.Control as="textarea" rows={2} cols={40} value={form.description} onChange={handleChange('description')} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={clickExecute} className="buttonSm" >execute</Button>
                <Button variant="dark" onClick={props.close} className="buttonSm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TaskEditModal;
