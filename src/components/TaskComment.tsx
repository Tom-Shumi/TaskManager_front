import React from 'react';

interface TaskCommentProps {
    id: number;
    taskId: number;
    comment: string;
}

const TaskComment: React.FC<TaskCommentProps> = (props) => {

    return (
        <div>
            {props.id}
            {props.taskId}
            {props.comment}
        </div>
    )
}

export default TaskComment;