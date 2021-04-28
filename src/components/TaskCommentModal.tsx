import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';
import { Task } from '../components/interface';
import "react-datepicker/dist/react-datepicker.css";
import TaskComment from '../components/TaskComment';
import styles from '../styles/TaskComment.module.css';
import { TaskComment as TaskCommentClass } from './interface';

interface TaskCommentModalProps {
    close: () => void;
    _setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task;
}


const TaskCommentModal: React.FC<TaskCommentModalProps> = (props) => {
    const [inputComment, setInputComment] = useState<string>("");
    const [comments, setComments] = useState<TaskCommentClass[]>([]);
    const [initDispFlg, setInitDispFlg] = useState<boolean>(true);
　　
    useEffect(() => {
        setInitDispFlg(false);
        clearInputComment();
        callGetTaskCommentList();
    }, [initDispFlg]);

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });
  
    const callGetTaskCommentList = () => {
        var res: Promise<TaskCommentClass[]> = getTaskCommentList(props.task.id);
        res.then(ret => setComments(ret));
    }

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
            setInitDispFlg(true);
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    const clearInputComment = () => {
        return setInputComment("");
    }

    const loadNextComment = () => {
        let maxCommentId = comments[comments.length - 1].id
        alert(maxCommentId)
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
                comments.map((taskComment) => (
                    <TaskComment
                        taskComment={taskComment}
                        setInitDispFlg={setInitDispFlg}
                        key={"taskComment" + taskComment.id}
                    />
                ))
            }
            <div className={styles.task_comment_load} onClick={loadNextComment}><i className="fa fa-arrow-circle-down faa-wrench animated-hover" /></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.close} className="button_sm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

// 各apiを呼び出しタスクコメントリストを取得する
async function getTaskCommentList(taskId){
    let client = Axios.create({ withCredentials: true });
    var taskCommentList :TaskCommentClass[] = [];
    try {
        const res = await client.get(`${process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK_COMMENT}${taskId}`);

        taskCommentList = createTaskCommentList(res.data);
    } catch(error){
        Router.push('/Error?400');
    }
    return taskCommentList;
}

function createTaskCommentList(commentList: any[]): TaskCommentClass[] {
    var taskCommentList :TaskCommentClass[] = [];
    if (commentList == null) {
        return taskCommentList;
    }
    for (var i = 0 ; i < commentList.length ; i++) {
        taskCommentList.push(new TaskCommentClass(commentList[i]["id"], commentList[i]["taskId"], commentList[i]["username"], commentList[i]["comment"], commentList[i]["createDate"]))
    }
    return taskCommentList;
}

export default TaskCommentModal;