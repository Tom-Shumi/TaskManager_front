import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';
import { Task } from '../components/interface';
import DatePicker, { registerLocale } from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import * as DatePickerUtil from './DatePickerUtil';
import * as ConversionUtil from './ConversionUtil';
import TaskComment from '../components/TaskComment';
import styles from '../styles/TaskComment.module.css';


registerLocale('ja', ja)


interface TaskCommentModalProps {
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task;
}


const TaskCommentModal: React.FC<TaskCommentModalProps> = (props) => {
    const [saveComment, setSaveComment] = useState<string>("");
　　
    // 初期表示処理
    useEffect(() => {        

    }, []);
  
    const handleChangeSaveComment = () => {
        return e => setSaveComment(e.target.value);
    }

    const clearSaveComment = () => {
        return setSaveComment("");
    }

    return (
        <Modal show={true} onHide={props.close} key='taskCommentModal'>
            <Modal.Header closeButton>
                <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row>
                    <Col xs={12} className="modal_input">
                        <Form.Control as="textarea" rows={2} value={saveComment} onChange={handleChangeSaveComment()}/>
                    </Col>
                    <div className={styles.task_comment_button_frame}>
                        <div className={styles.task_comment_button}><Button variant="primary" className="button_sm" >save</Button></div>
                        <div className={styles.task_comment_button}><Button variant="outline-dark" className="button_sm" onClick={clearSaveComment} >clear</Button></div>
                    </div>
                    <hr />
                </Row>
            </Form>
            {
                props.task.comments.map(taskComment => (
                    <TaskComment
                        id={taskComment.id}
                        taskId={taskComment.taskId}
                        comment={taskComment.comment}
                        key={"taskComment" + taskComment.id}
                    />
                ))
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.close} className="button_sm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TaskCommentModal;