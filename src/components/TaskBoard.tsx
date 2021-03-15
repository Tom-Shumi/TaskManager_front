import React from 'react';
import TaskList from '../components/TaskList'
import { Task } from './interface';
import Router from 'next/router';
import axios from "axios";
import { useState } from "react";

interface TaskBoardProps {

}

const TaskBoard: React.FC<TaskBoardProps> = (props) => {
    const [taskListNotStarted, setTaskListNotStarted] = useState<Task[]>(getTaskListNotStarted());
    const [taskListInProgress, setTaskListInProgress] = useState<Task[]>(getTaskListInProgress());
    const [taskListDone, setTaskListDone] = useState<Task[]>(getTaskListDone());

    var taskList: Task[] = new Array(4);
    taskList.push({taskTitle: "test1" ,description: "aaa1" ,priority: 1});
    taskList.push({taskTitle: "test2" ,description: "aaa2" ,priority: 2});
    taskList.push({taskTitle: "test3" ,description: "aaa3" ,priority: 3});
    taskList.push({taskTitle: "test4" ,description: "aaa4" ,priority: 2});
    return (
        <div className="">
            <TaskList taskList={taskListNotStarted} status="1" />
            <TaskList taskList={taskListInProgress} status="2" />
            <TaskList taskList={taskListDone} status="3" />
        </div>
    )
}

function getTaskListNotStarted(): Task[]{
    axios.get(process.env.NEXT_PUBLIC_API_TASK + "/1")
        .then(response => {
                
        }).catch(() => {
            Router.push('/Error?400');
        }); 
    return null;
}

function getTaskListInProgress(): Task[]{
    return null;
}

function getTaskListDone(): Task[]{
    return null;
}

export default TaskBoard;