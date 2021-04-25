import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../styles/TaskComment.module.css';
import { TaskComment as TaskCommentClass } from './interface';
import Router from 'next/router';
import Axios from "axios";

interface TaskCommentProps {
    taskComment: TaskCommentClass;
    setInitDispFlg: Dispatch<SetStateAction<boolean>>;
}

const TaskComment: React.FC<TaskCommentProps> = (props) => {

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

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
    }

    return (
        <div className={styles.task_comment}>
            <div>
                {props.taskComment.comment}
                <div className={styles.task_comment_icons}>
                    <div className={styles.task_comment_icon}><i onClick={updateTaskComment} className="fa fa-edit faa-wrench animated-hover" /></div>
                    <div className={styles.task_comment_icon}><i onClick={deleteTaskComment} className="fa fa-trash faa-wrench animated-hover" /></div>
                </div>
            </div>
        </div>
    )
}

export default TaskComment;