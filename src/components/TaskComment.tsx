import React from 'react';
import styles from '../styles/TaskComment.module.css';

interface TaskCommentProps {
    id: number;
    taskId: number;
    comment: string;
}

const TaskComment: React.FC<TaskCommentProps> = (props) => {

    return (
        <div className={styles.task_comment}>
            <p>
                {props.comment}
                <div className={styles.task_comment_icons}>
                    <div className={styles.task_comment_icon}><i className="fa fa-edit faa-wrench animated-hover" /></div>
                    <div className={styles.task_comment_icon}><i className="fa fa-trash faa-wrench animated-hover" /></div>
                </div>
            </p>
        </div>
    )
}

export default TaskComment;