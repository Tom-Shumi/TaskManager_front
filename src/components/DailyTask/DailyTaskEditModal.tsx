import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {getApiClient} from '../util/AuthenticationUtil';
import Router from 'next/router';
import { DailyTask } from '../common/interface';
import DatePicker, { registerLocale } from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import * as DatePickerUtil from '../util/DatePickerUtil';
import * as ConversionUtil from '../util/ConversionUtil';

interface DailyTaskEditModalProps {
    close: () => void;
    execSbt: string;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    dailyTask: DailyTask;
}

const DailyTaskEditModal: React.FC<DailyTaskEditModalProps> = (props) => {
    const [form, setForm] = useState({id: -1, title: "", description: "", priority: 1, quota: 0, deleteFlg: 0});
　　
    // form入力のハンドリング
    const handleChange = (input) => {
        return e => setForm({...form, [input]: e.target.value})
    }
    
    // cookieを使用するaxios生成
    let client = getApiClient();

    // executeボタン押下処理
    const clickExecute = () => {
        execute();
    }

    // リクエスト用json取得
    const getJsonParams = () => {
        var params = {
            title: form.title,
            description: form.description,
            priority: form.priority,
            quota: form.quota,
            deleteFlg: form.deleteFlg
        }
        
        return JSON.stringify(params);
    }

    // task登録
    const create = () => {
        var jsonParams = getJsonParams();
    
        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( () => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    // task更新
    const update = () => {
        var jsonParams = getJsonParams();
    
        client.put(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY + "/" + props.dailyTask.id
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( () => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    // 登録or更新判定
    let title: string;
    let execute: () => void;
    switch(props.execSbt) {
        case "1":
            title = 'Create Daily Task';
            execute = create;
            break;
        case "2":
            title = 'Update Daily Task';
            execute = update;
            break;
    }
    
    return (
        <Modal show={true} onHide={props.close} key='dailyTaskEditModal'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={4} className="modal_label">
                            <strong>Title</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                                <Form.Control type="text" value={form.title} onChange={handleChange('title')} />
                        </Col>
                        <hr />
                        <Col xs={4} className="modal_label">
                            <strong>Description</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                                <Form.Control as="textarea" rows={2} cols={40} value={form.description} onChange={handleChange('description')} />
                        </Col>
                        <hr />
                        <Col xs={4} className="modal_label">
                            <strong>Priority</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                            <Form.Control as="select" value={form.priority} onChange={handleChange('priority')}>
                                <option key="priority1" value="1">LOW</option>
                                <option key="priority2" value="2">MEDIUM</option>
                                <option key="priority3" value="3">HIGH</option>
                            </Form.Control>
                        </Col>
                        <hr />
                        <Col xs={4} className="modal_label">
                            <strong>Quota</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                                <Form.Control as="text" value={form.quota} onChange={handleChange('quota')} />
                        </Col>
                        <hr />
                        <Col xs={4} className="modal_label">
                            <strong>Delete Flg</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                            <Form.Check inline type="radio" id="deleteFlgOn" name="deleteFlg" value="1" label="ON" onChange={handleChange('deleteFlg')} />
                            <Form.Check inline type="radio" id="deleteFlgOff" name="deleteFlg" value="0" label="OFF" onChange={handleChange('deleteFlg')} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={clickExecute} className="button_sm" >execute</Button>
                <Button variant="dark" onClick={props.close} className="button_sm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DailyTaskEditModal;