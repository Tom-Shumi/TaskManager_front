import React , { Dispatch, SetStateAction } from 'react';
import styles from 'styles/TaskItem.module.css';
import { Task } from 'components/type/Task';
import {Constants} from 'components/Constants';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import { useDrag } from 'react-dnd';
import * as ConversionUtil from 'components/util/ConversionUtil';
import * as Util from 'components/util/Util';

interface TaskItemProps {
    task: Task;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showTaskUpdateModal: (task: Task) => void;
    showTaskCommentModal: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {

    // 日付表示文字列設定
    let dateTitleStr = ConversionUtil.conversionDateStr(props.task.status);
    let date: string = "";
    switch(props.task.status){
        case 1:
        case 2:
            date = props.task.planDate;
            break;
        case 3:
            date = props.task.doneDate;
            break;
    }

    let priority = ConversionUtil.conversionPriority(props.task.priority);
    let priorityStr = priority.str;
    let priorityClassName = priority.className;

    const [_, drag] = useDrag(() => ({
        type: Constants.ItemTypes.TASK_ITEM,
        item: { id: props.task.id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    // cookieを使用するaxios生成
    let client = getApiClient();

    const deleteTask = (e: any) => {
        if(confirm("Do you want to delete it?")){
            client.delete(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK)}/${props.task.id}`)
            .then( _ => {
                props.setInitDispFlg(true);
            }).catch(() => {
                Router.push('/');
            })
        }
        e.stopPropagation();
    }

    return (
        <div ref={drag} className={styles.taskItem} onClick={ () => props.showTaskUpdateModal(props.task)}>
            <div className={styles.taskItemTitle}>
                [<span className={priorityClassName}>{priorityStr}</span>]
                {props.task.taskTitle}
                <p className={styles.taskItemIcon}><i onClick={deleteTask} className="fa fa-trash faa-wrench animated-hover" /></p>
            </div>
            <div className={styles.taskItemDate}>
                [{dateTitleStr}] {date}
                <p className={styles.taskItemIcon}><i onClick={ (e) => {props.showTaskCommentModal(props.task); e.stopPropagation();}} className="fa fa-comment faa-wrench animated-hover" /></p>
            </div>
            <div className={styles.taskItemDescription}>{props.task.description}</div>
        </div>
    )
}

export default TaskItem;
