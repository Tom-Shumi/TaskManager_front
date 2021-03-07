import React from 'react';
import styles from '../styles/TaskItem.module.css';
import { Task } from './interface';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {

    var priority = conversionPriority(props.task.priority);
    var priority_str = priority.str;
    var priority_className = priority.className;

    return (
        <div className={styles.task_item}>
            <div className={styles.task_item_title}>[<span className={priority_className}>{priority_str}</span>] {props.task.taskTitle}</div>
            <div className={styles.task_item_description}>{props.task.description}</div>
        </div>
    )
}

function conversionPriority(priority: number){
    var str: string;
    var className: string;
    switch(priority) {
        case 1:
            str = 'low';
            className = 'blue';
            break;
        case 2:
            str = 'medium';
            break;
        case 3:
            str = 'high';
            className = 'red';
            break;
    }
    return { str: str, className: className }
}

export default TaskItem;