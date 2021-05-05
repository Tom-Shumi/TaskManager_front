import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import TaskList from '../components/TaskList'
import { TaskGraph as TaskGraphClass } from './interface';
import Router from 'next/router';
import Axios from "axios";
import styles from '../styles/TaskBoard.module.css';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

interface TaskGraphProps {

}

const TaskGraph: React.FC<TaskGraphProps> = (props) => {
    // 未対応のタスク
    const [planTaskGraphList, setPlanTaskGraphList] = useState<TaskGraphClass[]>([]);
    // 対応中のタスク
    const [doneTaskGraphList, setDoneTaskGraphList] = useState<TaskGraphClass[]>([]);
    // 対応済みのタスク
    const [commentGraphList, setCommentGraphList] = useState<TaskGraphClass[]>([]);

  useEffect(() => {
    callGetTaskGraphInfo();
  }, []);

  const callGetTaskGraphInfo = () => {
    var res: Promise<TaskGraphClass[][]> = getTaskGraphInfo();
    res.then(ret => setPlanTaskGraphList(ret[0]));
    res.then(ret => setDoneTaskGraphList(ret[1]));
    res.then(ret => setCommentGraphList(ret[2]));
  }

  let planTaskGraphLabel = [];
  planTaskGraphList.map(taskGraph => planTaskGraphLabel.push(taskGraph.date));

  let planTaskGraphDataSet = [];
  planTaskGraphList.map(taskGraph => planTaskGraphDataSet.push(taskGraph.count));

  const planTaskGraphData = {
    labels: planTaskGraphLabel,
    datasets: [
      {
        data: planTaskGraphDataSet,
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: '完了予定のタスク(件数)',
      },
    ],
  };

  const planTaskGraphOption = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'タスク(件数)',
          },
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}},
          },
        },
      ],
    },
  };

    return (
        <div>
            <Bar type="" data={planTaskGraphData} options={planTaskGraphOption} />
        </div>
    )
}

async function getTaskGraphInfo(){
  let client = Axios.create({ withCredentials: true });
  var planTaskGraphList :TaskGraphClass[] = [];
  var doneTaskGraphList :TaskGraphClass[] = [];
  var commentGraphList :TaskGraphClass[] = [];
  try {
      const taskGraphInfo = await client.get(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK_GRAPH);
      
      planTaskGraphList = createTaskGraphList(taskGraphInfo.data["planTask"]);
      doneTaskGraphList = createTaskGraphList(taskGraphInfo.data["doneTask"]);
      commentGraphList = createTaskGraphList(taskGraphInfo.data["comment"]);
  } catch(error){
      Router.push('/Error?400');
  }
  return [planTaskGraphList, doneTaskGraphList, commentGraphList];
}

// apiレスポンスからタスクリストを生成する
function createTaskGraphList(responseData: any[]): TaskGraphClass[]{
  let length: number = responseData.length;
  var taskGraphList :TaskGraphClass[] = [];
  for (var i = 0 ; i < length ; i++) {
      let taskGraph = new TaskGraphClass(responseData[i]["date"], responseData[i]["count"]);
      taskGraphList.push(taskGraph);
  }
  return taskGraphList;
}

export default TaskGraph