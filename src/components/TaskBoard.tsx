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

    let client = Axios.create({ withCredentials: true });

    client.get(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK + "/2")
        .then(response => {
            createTaskList(response.data);
        }).catch(() => {
            Router.push('/Error?400');
        }); 

    var taskList: Task[] = new Array(4);
    taskList.push({taskTitle: "test1" ,description: "aaa1" ,priority: 1});
    taskList.push({taskTitle: "test2" ,description: "aaa2" ,priority: 2});
    taskList.push({taskTitle: "test3" ,description: "aaa3" ,priority: 3});
    taskList.push({taskTitle: "test4" ,description: "aaa4" ,priority: 2});
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
    for (var i = 0 ; i < length ; i++) {
        console.log(responseData[i]);
        console.log(responseData[i].id);
    }
    return null;
}

export default TaskBoard;