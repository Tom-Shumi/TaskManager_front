import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { TaskGraph as TaskGraphClass } from '../common/interface';
import Router from 'next/router';
import {getApiClient} from '../util/AuthenticationUtil';

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
        label: '完了予定タスク(件数)',
      },
    ],
  };

  let doneTaskGraphLabel = [];
  doneTaskGraphList.map(taskGraph => doneTaskGraphLabel.push(taskGraph.date));

  let doneTaskGraphDataSet = [];
  doneTaskGraphList.map(taskGraph => doneTaskGraphDataSet.push(taskGraph.count));

  const doneTaskGraphData = {
    labels: doneTaskGraphLabel,
    datasets: [
      {
        data: doneTaskGraphDataSet,
        backgroundColor: 'rgba(255, 200, 0, 1)',
        label: '完了タスク(件数)',
      },
    ],
  };

  console.log("done")

  return (
        <div>
          ■日毎の完了予定タスク数
          <Bar type="" data={planTaskGraphData} options={{}}/>
          <br />
          ■日毎の完了タスク数
          <Bar type="" data={doneTaskGraphData} options={{}} />
        </div>
  )
}

async function getTaskGraphInfo(){
  let client = getApiClient();
  var planTaskGraphList :TaskGraphClass[] = [];
  var doneTaskGraphList :TaskGraphClass[] = [];
  var commentGraphList :TaskGraphClass[] = [];
  try {
      const taskGraphInfo = await client.get(process.env.NEXT_PUBLIC_API_TASK_GRAPH);
      
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