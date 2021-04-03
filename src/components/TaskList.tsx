import React , { Dispatch, SetStateAction } from 'react';
import TaskItem from '../components/TaskItem';
import styles from '../styles/TaskList.module.css';
import { ItemTypes, Task } from './interface';
import { useDrop } from 'react-dnd';
import Axios from "axios";
import Router from 'next/router';

interface TaskListProps {
    taskList: Task[];
    status: number;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    show: (Task) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const updateTaskStatus = (id: number, status: number) => {
        var params = {
            status: status
        }
        var jsonParams = JSON.stringify(params);

        client.put(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/status/" + id
            , jsonParams
            , {headers: {'content-type': 'application/json'}}
        ).then( response => {
            props.setInitDispFlg(true);
        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.TASK_ITEM,
        drop: (dragItem: any) => {
            updateTaskStatus(dragItem.id, props.status);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    var status_str = conversionStatus(props.status);
    var style_is_over = isOver ? "is_over" : "is_not_over"; 
    return (
        <div className={styles.task_list + " " +  style_is_over} ref={drop}>
            <p className={styles.task_status}>{status_str} [{Object.keys(props.taskList).length}]</p>
            {
                props.taskList.map(task_item => (
                    <TaskItem
                        task={task_item}
                        setInitDispFlg={props.setInitDispFlg}
                        show={props.show}
                        key={"TaskItem" + task_item.id}
                    />
                ))
            }
        </div>
    )
}

function conversionStatus(status: number){
    var str: string;
    switch(status) {
        case 1:
            str = 'NOT STARTED';
            break;
        case 2:
            str = 'IN PROGRESS';
            break;
        case 3:
            str = 'DONE';
            break;
    }
    return str;
}

export default TaskList;