import React from 'react';
import styles from '../styles/TaskComment.module.css';

interface TaskCommentProps {
    id: number;
    taskId: number;
    comment: string;
}

const TaskComment: React.FC<TaskCommentProps> = (props) => {

    return (
        <div className={styles.task_comment} key={"taskComment" + props.id}>
            <p>
                {props.comment}
                <i className="fa fa-trash faa-wrench animated-hover" />
                <i className="fa fa-edit faa-wrench animated-hover" />
            </p>
        </div>
    )
}

export default TaskComment;