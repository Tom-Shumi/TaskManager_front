import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import TaskList from 'components/TaskBoard/TaskList'
import { Task } from 'components/type/Task';
import Router from 'next/router';
import styles from '/styles/TaskBoard.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getApiClient } from 'components/util/AuthenticationUtil';

interface TaskBoardProps {
    initDispFlg: Boolean;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    showTaskUpdateModal: (task: Task) => void;
    showTaskCommentModal: (task: Task) => void;
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
            <DndProvider backend={HTML5Backend}>
                <TaskList taskList={taskListNotStarted} status={1} setInitDispFlg={props.setInitDispFlg} showTaskUpdateModal={props.showTaskUpdateModal} showTaskCommentModal={props.showTaskCommentModal} key="TaskList1"/>
                <TaskList taskList={taskListInProgress} status={2} setInitDispFlg={props.setInitDispFlg} showTaskUpdateModal={props.showTaskUpdateModal} showTaskCommentModal={props.showTaskCommentModal} key="TaskList2" />
                <TaskList taskList={taskListDone} status={3} setInitDispFlg={props.setInitDispFlg} showTaskUpdateModal={props.showTaskUpdateModal} showTaskCommentModal={props.showTaskCommentModal} key="TaskList3" />
            </DndProvider>
        </div>
    )
}

// 各apiを呼び出しタスクリストを取得する
async function getTaskList(){
    var listNotStarted :Task[] = [];
    var lisInProgress :Task[] = [];
    var listDone :Task[] = [];
    try {
        const resNotStarted = await getApiClient().get(`${process.env.NEXT_PUBLIC_API_TASK}/1`);
        const resInProgress = await getApiClient().get(`${process.env.NEXT_PUBLIC_API_TASK}/2`);
        const resDone = await getApiClient().get(`${process.env.NEXT_PUBLIC_API_TASK}/3`);

        listNotStarted = createTaskList(resNotStarted.data);
        lisInProgress = createTaskList(resInProgress.data);
        listDone = createTaskList(resDone.data);
    } catch(error){
        Router.push('/');
    }
    return [listNotStarted, lisInProgress, listDone];
}

// apiレスポンスからタスクリストを生成する
function createTaskList(responseData: any[]): Task[]{
    let length: number = responseData.length;
    var taskList :Task[] = [];
    for (var i = 0 ; i < length ; i++) {
        let task = new Task(responseData[i]["id"], responseData[i]["task"], responseData[i]["description"], responseData[i]["priority"], responseData[i]["status"], responseData[i]["planDate"], responseData[i]["doneDate"], []);
        taskList.push(task);
    }
    return taskList;
}

export default TaskBoard;
