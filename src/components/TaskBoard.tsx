import React from 'react';
import TaskList from '../components/TaskList'
import { Task } from './interface';
import Router from 'next/router';
import Axios from "axios";
import { useState } from "react";

interface TaskBoardProps {

}

const TaskBoard: React.FC<TaskBoardProps> = (props) => {
    const [taskListNotStarted, setTaskListNotStarted] = useState<Task[]>(null);
    const [taskListInProgress, setTaskListInProgress] = useState<Task[]>(null);
    const [taskListDone, setTaskListDone] = useState<Task[]>(null);
    const [initFlg, setInitFlg] = useState<Boolean>(true);

    const callGetTaskList = () => {
        var res: Promise<Task[][]> = getTaskList();
        res.then(ret => setTaskListNotStarted(ret[0]));
        res.then(ret => setTaskListInProgress(ret[1]));
        res.then(ret => setTaskListDone(ret[2]));
    }

    if (initFlg) {
        setInitFlg(false);
        callGetTaskList();
    }

    return (
        <div className="">
            <TaskList taskList={taskListNotStarted} status="1" />
            <TaskList taskList={taskListInProgress} status="2" />
            <TaskList taskList={taskListDone} status="3" />
        </div>
    )
}

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

function createTaskList(responseData: any[]): Task[]{
    let length: number = responseData.length;
    var taskList :Task[] = [];
    for (var i = 0 ; i < length ; i++) {
        let task = new Task(responseData[i]["task"], responseData[i]["description"], responseData[i]["priority"]);
        taskList.push(task);
    }
    return taskList;
}

export default TaskBoard;