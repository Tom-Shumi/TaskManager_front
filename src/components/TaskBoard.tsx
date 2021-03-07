import React from 'react';
import TaskList from '../components/TaskList'
import { Task } from './interface';

interface TaskBoardProps {

}

const TaskBoard: React.FC<TaskBoardProps> = (props) => {
    var taskList: Task[] = new Array(4);
    taskList.push({taskTitle: "test1" ,description: "aaa1" ,priority: 1});
    taskList.push({taskTitle: "test2" ,description: "aaa2" ,priority: 2});
    taskList.push({taskTitle: "test3" ,description: "aaa3" ,priority: 3});
    taskList.push({taskTitle: "test4" ,description: "aaa4" ,priority: 2});
    return (
        <div className="">
            <TaskList taskList={taskList} status="1" />
            <TaskList taskList={taskList} status="2" />
            <TaskList taskList={taskList} status="3" />
        </div>
    )
}

export default TaskBoard;