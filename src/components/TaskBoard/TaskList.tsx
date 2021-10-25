import React , { Dispatch, SetStateAction } from 'react';
import TaskItem from 'components/TaskBoard/TaskItem';
import styles from 'styles/TaskList.module.css';
import { Task } from 'components/type/Task';
import {Constants} from 'components/Constants';
import { useDrop } from 'react-dnd';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import * as ConversionUtil from 'components/util/ConversionUtil';
import * as Util from 'components/util/Util';

interface TaskListProps {
    taskList: Task[];
    status: number;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showTaskUpdateModal: (task: Task) => void;
    showTaskCommentModal: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {

    // cookieを使用するaxios生成
    let client = getApiClient();

    const updateTaskStatus = (id: number, status: number) => {
        var params = {
            status: status
        }
        var jsonParams = JSON.stringify(params);

        client.put(`${Util.env(process.env.NEXT_PUBLIC_API_SERVER)}${Util.env(process.env.NEXT_PUBLIC_API_TASK)}/status/${id}`
            , jsonParams
            , {headers: {'content-type': 'application/json'}}
        ).then( _ => {
            props.setInitDispFlg(true);
        }).catch(() => {
            Router.push('/');
        })
    }

    const [{isOver}, drop] = useDrop({
        accept: Constants.ItemTypes.TASK_ITEM,
        drop: (dragItem: any) => {
            updateTaskStatus(dragItem.id, props.status);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    var statusStr = ConversionUtil.conversionStatus(props.status);
    var styleIsOver = isOver ? "isOver" : "isNotOver";
    return (
        <div className={styles.taskList + " " +  styleIsOver} ref={drop}>
            <p className={styles.taskStatus}>{statusStr} [ {Object.keys(props.taskList).length} ]</p>
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
