import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../styles/TaskComment.module.css';
import { TaskComment as TaskCommentClass } from './interface';
import {Form} from 'react-bootstrap';
import Router from 'next/router';
import Axios from "axios";

interface TaskCommentProps {
    taskComment: TaskCommentClass;
    setInitDispFlg: Dispatch<SetStateAction<boolean>>;
}

const TaskComment: React.FC<TaskCommentProps> = (props) => {
    const [updateFlg, setUpdateFlg] = useState<boolean>(false);
    const [inputComment, setInputComment] = useState<string>(props.taskComment.comment);

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const handleChangeInputComment = () => {
        return e => setInputComment(e.target.value);
    }

    const cancelTaskCommentEdit = () => {
        setUpdateFlg(false);
    }

    const deleteTaskComment = () => {
        if(confirm("Do you want to delete it?")){
            client.delete(`${process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK_COMMENT}${props.taskComment.taskId}/${props.taskComment.id}`)
            .then( response => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/Error?400');
            })
        }
    }

    const updateTaskComment = () => {
        if (updateFlg) {

        } else {
            setUpdateFlg(true);
        }
    }

    let comment = [];
    if (updateFlg) {
        comment.push(<div className={styles.task_comment_cancel_icon}　key={"commentCancel" + props.taskComment.id}><i onClick={cancelTaskCommentEdit} className="fa fa-times faa-wrench animated-hover" /></div>);
        comment.push(<Form.Control as="textarea" rows={2} cols={40} value={inputComment} onChange={handleChangeInputComment} key={"comment" + props.taskComment.id} />);
    } else {
        comment.push(props.taskComment.comment);
    }

    return (
        <div className={styles.task_comment}>
            <div>
                {comment}
                <div className={styles.task_comment_icons}>
                    <div className={styles.task_comment_icon}><i onClick={updateTaskComment} className="fa fa-edit faa-wrench animated-hover" /></div>
                    <div className={styles.task_comment_icon}><i onClick={deleteTaskComment} className="fa fa-trash faa-wrench animated-hover" /></div>
                </div>
            </div>
        </div>
    )
}

export default TaskComment;