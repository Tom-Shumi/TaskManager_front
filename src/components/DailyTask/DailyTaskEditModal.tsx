import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import { DailyTask } from 'components/type/DailyTask';
import "react-datepicker/dist/react-datepicker.css";
import * as NumberUtil from 'components/util/NumberUtil';
import * as Util from 'components/util/Util';

interface DailyTaskEditModalProps {
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    dailyTask: DailyTask | null;
}

const DailyTaskEditModal: React.FC<DailyTaskEditModalProps> = (props) => {
    const [form, setForm] = useState({id: -1, title: "", description: "", priority: 1, quota: "", deleteFlg: 0});
　　
    // 初期表示処理
    useEffect(() => {
        if (props.dailyTask != null) {
            setForm({id: props.dailyTask.id
                , title: props.dailyTask.title
                , description: props.dailyTask.description
                , priority: props.dailyTask.priority
                , quota: props.dailyTask.quota.toString()
                , deleteFlg: props.dailyTask.deleteFlg});
        }
    }, []);

    // form入力のハンドリング
    const handleChange = (input: string) => {
        return (e: any) => setForm({...form, [input]: e.target.value})
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
            title: form.title,
            description: form.description,
            priority: form.priority,
            quota: form.quota,
            deleteFlg: form.deleteFlg,
            createDate: props.dailyTask == null ? "" : props.dailyTask.createDate,
            deleteDate: props.dailyTask == null ? "" : props.dailyTask.deleteDate
        }
        return JSON.stringify(params);
    }

    const validate = () => {
        if (form.title == "") return false;
        if (form.quota == "" || !NumberUtil.isNumber(form.quota)) return false;

        return true;
    }

    // task登録
    const create = (): void => {
        if (!validate()) {
            return;
        }

        let jsonParams = getJsonParams();

        client.post(Util.env(process.env.NEXT_PUBLIC_API_SERVER) + Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK)
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( () => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/');
        })
    }

    // task更新
    const update = (): void => {
        if (!validate()) {
            return;
        }

        let jsonParams = getJsonParams();

        client.put(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK)}/${props.dailyTask!.id}`
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( () => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/');
        })
    }

    // 登録or更新判定
    let title: string;
    let execute: () => void;
    if (props.dailyTask == null) {
        title = 'Create Daily Task';
        execute = create;
    } else {
        title = 'Update Daily Task';
        execute = update;
    }

    return (
        <Modal show={true} onHide={props.close} key='dailyTaskEditModal'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={4} className="modalLabel">
                            <strong>Title</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                                <Form.Control type="text" value={form.title} onChange={handleChange('title')} />
                        </Col>
                        <hr />
                        <Col xs={4} className="modalLabel">
                            <strong>Description</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                                <Form.Control as="textarea" rows={7} cols={40} value={form.description} onChange={handleChange('description')} />
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
                            <strong>Quota</strong>
                        </Col>
                        <Col xs={8} className="modalInput">
                                <Form.Control type="text" className="modalInputNum displayInline" value={form.quota} onChange={handleChange('quota')} /> m
                        </Col>
                        <hr />
                        <Col xs={4} className="modalLabel">
                            <strong>Delete Flg</strong>
                        </Col>
                        <Col xs={8} className="modalInput paddingTop10">
                            <Form.Check inline type="radio" id="deleteFlgON" name="deleteFlg" checked={form.deleteFlg == 1} value="1" label="ON" onChange={handleChange('deleteFlg')} />
                            <Form.Check inline type="radio" id="deleteFlgFFF" name="deleteFlg" checked={form.deleteFlg == 0} value="0" label="OFF" onChange={handleChange('deleteFlg')} />
                        </Col>
                        {props.dailyTask != null &&
                        <React.Fragment>
                            <hr />
                            <Col xs={4} className="modalLabel">
                                <strong>Create Date</strong>
                            </Col>
                            <Col xs={8} className="modalInput paddingTop10">
                                {props.dailyTask.createDate}
                            </Col>
                            <hr />
                            <Col xs={4} className="modalLabel">
                                <strong>Delete Date</strong>
                            </Col>
                            <Col xs={8} className="modalInput paddingTop10">
                                {props.dailyTask.deleteDate != "" ? props.dailyTask.deleteDate : "-"}
                            </Col>
                        </React.Fragment>
                        }
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

export default DailyTaskEditModal;
