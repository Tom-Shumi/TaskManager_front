import React , { Dispatch, SetStateAction } from 'react';
import TaskItem from '../components/TaskItem';
import styles from '../styles/TaskList.module.css';
import { Task } from './interface';

interface TaskListProps {
    taskList: Task[];
    status: string;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const TaskList: React.FC<TaskListProps> = (props) => {
    var status_str = conversionStatus(props.status);
    return (
        <div className={styles.task_list}>
            <p className={styles.task_status}>{status_str} [{Object.keys(props.taskList).length}]</p>
            {
                props.taskList.map(task_item => (
                    <TaskItem
                        task={task_item}
                        setInitDispFlg={props.setInitDispFlg}
                    />
                ))
            }
        </div>
    )
}

function conversionStatus(status: string){
    var str: string;
    switch(status) {
        case "1":
            str = 'NOT STARTED';
            break;
        case "2":
            str = 'IN PROGRESS';
            break;
        case "3":
            str = 'DONE';
            break;
    }
    return str;
}

export default TaskList;