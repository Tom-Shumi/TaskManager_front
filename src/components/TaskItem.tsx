import React , { Dispatch, SetStateAction } from 'react';
import styles from '../styles/TaskItem.module.css';
import { Task, ItemTypes } from './interface';
import Axios from "axios";
import Router from 'next/router';
import { useDrag } from 'react-dnd';
import * as ConversionUtil from './ConversionUtil';

interface TaskItemProps {
    task: Task;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    show: (Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {

    // 日付表示文字列設定
    let dateTitleStr = ConversionUtil.conversionDateStr(props.task.status);
    var date: string;
    switch(props.task.status){
        case 1:
        case 2:
            date = props.task.planDate;
            break;
        case 3:
            date = props.task.doneDate;
            break;
    }

    var priority = ConversionUtil.conversionPriority(props.task.priority);
    var priority_str = priority.str;
    var priority_className = priority.className;

    const [isDragging, drag] = useDrag(() => ({
        type: ItemTypes.TASK_ITEM, 
        item: { id: props.task.id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const deleteTask = (e) => {
        if(confirm("Do you want to delete it?")){
            client.delete(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/" + props.task.id)
            .then( response => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/Error?400');
            })
        }
        e.stopPropagation();
    }

    return (
        <div ref={drag} className={styles.task_item} onClick={ () => props.show(props.task)}>
            <div className={styles.task_item_title}>
                [<span className={priority_className}>{priority_str}</span>]
                {props.task.taskTitle}
                <p className={styles.task_item_icon}><i onClick={deleteTask} className="fa fa-trash" /></p> 
            </div>
            <div className={styles.task_item_date}>[{dateTitleStr}] {date}</div>
            <div className={styles.task_item_description}>{props.task.description}</div>
        </div>
    )
}

export default TaskItem;