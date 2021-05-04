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

      /** グラフデータ */
  const graphData = {
    labels: [
      // 軸ラベル
      // 各ラベルを配列にすることで軸ラベルが改行されて表示される
      ['2019年', '1月'],
      ['2019年', '2月'],
      ['2019年', '3月'],
      ['2019年', '4月'],
      ['2019年', '5月'],
      ['2019年', '6月'],
      ['2019年', '7月'],
      ['2019年', '8月'],
      ['2019年', '9月'],
      ['2019年', '10月'],
      ['2019年', '11月'],
      ['2019年', '12月'],
    ],
    datasets: [
      // 表示するデータセット
      {
        data: [5.6, 7.2, 10.6, 13.6, 20, 21.8, 24.1, 28.4, 25.1, 19.4, 13.1, 8.5],
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: '月別合計降水量(mm)',
      },
    ],
  };

  /** グラフオプション */
  const graphOption = {
    scales: {
      xAxes: [
        // x軸オプション
        {
          scaleLabel: {
            // x軸ラベルオプション
            display: true,
            labelString: '2019年',
          },
        },
      ],
      yAxes: [
        // y軸オプション
        {
          scaleLabel: {
            // y軸ラベルオプション
            display: true,
            labelString: '合計降水量(mm)',
          },
          ticks: {
            // y軸メモリオプション
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(mm)`;
            },
          },
        },
      ],
    },
  };

    return (
        <div>
            <Bar type="" data={graphData} options={graphOption} />
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