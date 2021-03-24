import React , { Dispatch, SetStateAction } from 'react';
import styles from '../styles/TaskItem.module.css';
import { Task } from './interface';
import Axios from "axios";
import Router from 'next/router';

interface TaskItemProps {
    task: Task;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    show: (Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {

    var priority = conversionPriority(props.task.priority);
    var priority_str = priority.str;
    var priority_className = priority.className;

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const deleteTask = () => {
        if(confirm("Do you want to delete it?")){
            client.delete(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/" + props.task.id)
            .then( response => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/Error?400');
            })
        }
    }

    return (
        <div className={styles.task_item} onClick={ () => props.show(props.task)}>
            <div className={styles.task_item_title}>
                [<span className={priority_className}>{priority_str}</span>]
                {props.task.taskTitle}
                <p className={styles.task_item_icon}><i onClick={deleteTask} className="fa fa-trash" /></p> 
            </div>
            <div className={styles.task_item_description}>{props.task.description}</div>
        </div>
    )
}

function conversionPriority(priority: number){
    var str: string;
    var className: string;
    switch(priority) {
        case 1:
            str = 'LOW';
            className = 'blue';
            break;
        case 2:
            str = 'MEDIUM';
            break;
        case 3:
            str = 'HIGH';
            className = 'red';
            break;
    }
    return { str: str, className: className }
}

export default TaskItem;