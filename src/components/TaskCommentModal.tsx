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
import { TaskComment as TaskCommentClass } from './interface';


registerLocale('ja', ja)


interface TaskCommentModalProps {
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task;
}


const TaskCommentModal: React.FC<TaskCommentModalProps> = (props) => {
    const [inputComment, setInputComment] = useState<string>("");
    const [comments, setComments] = useState<TaskCommentClass[]>(props.task.comments);
　　
    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

   // 初期表示処理
    useEffect(() => {        

    }, []);
  
    const handleChangeInputComment = () => {
        return e => setInputComment(e.target.value);
    }

    const saveComment = () => {
        var params = {
            comment: inputComment
        }
        var jsonParams = JSON.stringify(params);
        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK_COMMENT + props.task.id
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( response => {
            // TODO 一覧にコメントセット

        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    const clearInputComment = () => {
        return setInputComment("");
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
                        <Form.Control as="textarea" rows={2} value={inputComment} onChange={handleChangeInputComment()}/>
                    </Col>
                    <div className={styles.task_comment_button_frame}>
                        <div className={styles.task_comment_button}><Button variant="primary" className="button_sm" onClick={saveComment} >save</Button></div>
                        <div className={styles.task_comment_button}><Button variant="outline-dark" className="button_sm" onClick={clearInputComment} >clear</Button></div>
                    </div>
                    <hr />
                </Row>
            </Form>
            {
                comments.map(taskComment => (
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