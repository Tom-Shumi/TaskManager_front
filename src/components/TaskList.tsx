import React , { Dispatch, SetStateAction } from 'react';
import TaskItem from '../components/TaskItem';
import styles from '../styles/TaskList.module.css';
import { ItemTypes, Task } from './interface';
import { useDrop } from 'react-dnd';
import {getApiClient} from '../components/Authentication';
import Router from 'next/router';
import * as ConversionUtil from './ConversionUtil';

interface TaskListProps {
    taskList: Task[];
    status: number;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showTaskUpdateModal: (Task) => void;
    showTaskCommentModal: (Task) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {

    // cookieを使用するaxios生成
    let client = getApiClient();

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

    var status_str = ConversionUtil.conversionStatus(props.status);
    var style_is_over = isOver ? "is_over" : "is_not_over"; 
    return (
        <div className={styles.task_list + " " +  style_is_over} ref={drop}>
            <p className={styles.task_status}>{status_str} [{Object.keys(props.taskList).length}]</p>
            {
                props.taskList.map(taskItem => (
                    <TaskItem
                        task={taskItem}
                        setInitDispFlg={props.setInitDispFlg}
                        showTaskUpdateModal={props.showTaskUpdateModal}
                        showTaskCommentModal={props.showTaskCommentModal}
                        key={"TaskItem" + taskItem.id}
                    />
                ))
            }
        </div>
    )
}

export default TaskList;