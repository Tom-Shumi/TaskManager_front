import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';
import { Task } from '../components/interface'

interface TaskEditModalProps {
    show: (Task) => void;
    close: () => void;
    execSbt: string;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task;
}


const TaskEditModal: React.FC<TaskEditModalProps> = (props) => {
    const [form, setForm] = useState({id: -1, task: "", priority: 1, description: ""});
　　
    useEffect(() => {
        if (props.task != null) {
            setForm({id: props.task.id, task: props.task.taskTitle, priority: props.task.priority, description: props.task.description});
        }
    }, []);

    // form入力のハンドリング
    const handleChange = (input) => {
        return e => setForm({...form, [input]: e.target.value})
    }
    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    // executeボタン押下処理
    const clickExecute = () => {
        execute();
    }

    // リクエスト用json取得
    const getJsonParams = () => {
        var params = {
            task: form.task,
            priority: form.priority,
            status: '1',
            description: form.description
        }
        
        return JSON.stringify(params);
    }

    // task登録
    const create = () => {
        var jsonParams = getJsonParams();
    
        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( response => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    // task更新
    const update = () => {
        var jsonParams = getJsonParams();
    
        client.put(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/" + props.task.id
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( response => {
            props.setInitDispFlg(true);
            props.close();
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    let title: string;
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
        <Modal show={props.show} onHide={props.close} key='taskEditModal'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={4} className="modal_label">
                            <strong>Task</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                                <Form.Control type="text" value={form.task} onChange={handleChange('task')} />
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
                            <strong>Description</strong>
                        </Col>
                        <Col xs={8} className="modal_input">
                                <Form.Control as="textarea" rows={4} cols={40} value={form.description} onChange={handleChange('description')} />
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

export default TaskEditModal;