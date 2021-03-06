import React, { useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import { Task } from 'components/type/Task';
import "react-datepicker/dist/react-datepicker.css";
import TaskComment from 'components/TaskBoard/TaskComment';
import styles from 'styles/TaskComment.module.css';
import { TaskComment as TaskCommentClass } from 'components/type/TaskComment';
import * as Util from 'components/util/Util';

interface TaskCommentModalProps {
    close: () => void;
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
    let client = getApiClient();

    const callGetTaskCommentList = () => {
        let res: Promise<TaskCommentClass[]> = getTaskCommentList(props.task.id);
        res.then(ret => setComments(ret));
    }

    const handleChangeInputComment = () => {
        return (e:any) => setInputComment(e.target.value);
    }

    const saveComment = () => {
        let params = {
            comment: inputComment
        }
        let jsonParams = JSON.stringify(params);
        client.post(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK_COMMENT)}/${props.task.id}`
            , jsonParams
            , {headers: {'content-type': 'application/json'}})
        .then( _ => {
            setInitDispFlg(true);
        }).catch(() => {
            Router.push('/');
        })
    }

    const clearInputComment = () => {
        return setInputComment("");
    }

    const loadNextComment = () => {
        if (comments.length == 0) {
            return;
        }

        let maxCommentId = comments[comments.length - 1].id
        try {
            client.get(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK_COMMENT)}/${props.task.id}?nextKey=${maxCommentId}`)
                .then(res => {
                    let taskCommentList = createTaskCommentList(res.data);
                    setComments([...comments, ...taskCommentList])
                })
        } catch(error){
            Router.push('/');
        }
    }

    return (
        <Modal show={true} onHide={props.close} key='taskCommentModal'>
            <Modal.Header closeButton>
                <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row>
                    <Col xs={12} className="modalInput">
                        <Form.Control as="textarea" rows={2} value={inputComment} onChange={handleChangeInputComment()}/>
                    </Col>
                    <div className={styles.taskCommentButtonFrame}>
                        <div className={styles.taskCommentButton}><Button variant="primary" className="buttonSm" onClick={saveComment} >save</Button></div>
                        <div className={styles.taskCommentButton}><Button variant="outline-dark" className="buttonSm" onClick={clearInputComment} >clear</Button></div>
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
            <div className="nextLoadIcon" onClick={loadNextComment}><i className="fa fa-arrow-circle-down faa-wrench animated-hover" /></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.close} className="buttonSm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

// 各apiを呼び出しタスクコメントリストを取得する
async function getTaskCommentList(taskId: number){
    let client = getApiClient();
    let taskCommentList :TaskCommentClass[] = [];
    try {
        const res = await client.get(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK_COMMENT)}/${taskId}`);

        taskCommentList = createTaskCommentList(res.data);
    } catch(error){
        Router.push('/');
    }
    return taskCommentList;
}

function createTaskCommentList(commentList: any[]): TaskCommentClass[] {
    let taskCommentList :TaskCommentClass[] = [];
    if (commentList == null) {
        return taskCommentList;
    }
    for (let i = 0 ; i < commentList.length ; i++) {
        taskCommentList.push(new TaskCommentClass(commentList[i]["id"], commentList[i]["taskId"], commentList[i]["username"], commentList[i]["comment"], commentList[i]["createDate"]))
    }
    return taskCommentList;
}

export default TaskCommentModal;
