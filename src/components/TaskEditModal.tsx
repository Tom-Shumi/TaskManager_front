import React, { Dispatch, SetStateAction, useState } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';
import { Task } from '../components/interface'

interface TaskEditModalProps {
    show: (Task) => void;
    close: () => void;
    title: string;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task;
}


const TaskEditModal: React.FC<TaskEditModalProps> = (props) => {
    const [form, setForm] = useState({task: "", priority: "1", description: ""});
　　
    // form入力のハンドリング
    const handleChange = (input) => {
        return e => setForm({...form, [input]: e.target.value})
    }
    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const createTask = () => {
        var params = {
            task: form.task,
            priority: form.priority,
            status: '1',
            description: form.description
        }
        
        var jsonParams = JSON.stringify(params);
    
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

    return (
        <Modal show={props.show} onHide={props.close} key='taskEditModal'>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
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
               <Button variant="primary" onClick={createTask} className="button_sm" >create</Button>
                <Button variant="dark" onClick={props.close} className="button_sm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TaskEditModal;