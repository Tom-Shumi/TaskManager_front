import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import TaskList from '../components/TaskList'
import { Task } from './interface';
import Router from 'next/router';
import Axios from "axios";
import styles from '../styles/TaskBoard.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface TaskBoardProps {
    initDispFlg: Boolean;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    show: (Task) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = (props) => {
    // 未対応のタスク
    const [taskListNotStarted, setTaskListNotStarted] = useState<Task[]>([]);
    // 対応中のタスク
    const [taskListInProgress, setTaskListInProgress] = useState<Task[]>([]);
    // 対応済みのタスク
    const [taskListDone, setTaskListDone] = useState<Task[]>([]);

    useEffect(() => {
        props.setInitDispFlg(false);
        callGetTaskList();
    }, [props.initDispFlg]);

    const callGetTaskList = () => {
        var res: Promise<Task[][]> = getTaskList();
        res.then(ret => setTaskListNotStarted(ret[0]));
        res.then(ret => setTaskListInProgress(ret[1]));
        res.then(ret => setTaskListDone(ret[2]));
    }

    return (
        <div className={styles.task_board}>
            <TaskList taskList={taskListNotStarted} status="1" setInitDispFlg={props.setInitDispFlg} show={props.show} key="TaskList1"/>
            <TaskList taskList={taskListInProgress} status="2" setInitDispFlg={props.setInitDispFlg} show={props.show} key="TaskList2" />
            <TaskList taskList={taskListDone} status="3" setInitDispFlg={props.setInitDispFlg} show={props.show} key="TaskList3" />
        </div>
    )
}

// 各apiを呼び出しタスクリストを取得する
async function getTaskList(){
    let client = Axios.create({ withCredentials: true });
    var listNotStarted :Task[] = [];
    var lisInProgress :Task[] = [];
    var listDone :Task[] = [];
    try {
        const resNotStarted = await client.get(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/1");
        const resInProgress = await client.get(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/2");
        const resDone = await client.get(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/3");

        listNotStarted = createTaskList(resNotStarted.data);
        lisInProgress = createTaskList(resInProgress.data);
        listDone = createTaskList(resDone.data);
    } catch(error){
        Router.push('/Error?400');
    }
    return [listNotStarted, lisInProgress, listDone];
}

// apiレスポンスからタスクリストを生成する
function createTaskList(responseData: any[]): Task[]{
    let length: number = responseData.length;
    var taskList :Task[] = [];
    for (var i = 0 ; i < length ; i++) {
        let task = new Task(responseData[i]["id"], responseData[i]["task"], responseData[i]["description"], responseData[i]["priority"], responseData[i]["status"]);
        taskList.push(task);
    }
    return taskList;
}

export default TaskBoard;