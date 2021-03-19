import React from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';

interface TaskEditModalProps {
    show: () => void;
    close: () => void;
    title: string;
}


const TaskEditModal: React.FC<TaskEditModalProps> = (props) => {

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const createTask = () => {

        var params = new URLSearchParams();
        params.append('task', '');
        params.append('priority', '');
        params.append('status', '');
        params.append('description', '');
    
        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK, params)
        .then( response => {


            Router.push('/Task');

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
                        <Col xs={8} className="">
                                <Form.Control type="text" className="" value="" />
                        </Col>

                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.close} className="button_sm" >
                    close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TaskEditModal;