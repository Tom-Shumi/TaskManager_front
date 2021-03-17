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

    var tempTaskList :Task[] = [];

    let client = Axios.create({ withCredentials: true });

    client.get(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/1")
        .then(response => {
            tempTaskList = createTaskList(response.data);
        }).catch(() => {
            Router.push('/Error?400');
        }); 
    console.log(taskListNotStarted);
    return (
        <div className="">
            {/* <TaskList taskList={taskListNotStarted} status="1" />
            <TaskList taskList={taskListInProgress} status="2" />
            <TaskList taskList={taskListDone} status="3" /> */}
        </div>
    )
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