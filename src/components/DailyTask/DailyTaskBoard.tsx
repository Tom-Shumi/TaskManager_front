import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import DailyTaskList from './DailyTaskList';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DailyTask } from '../common/interface';
import {getApiClient} from '../util/AuthenticationUtil';
import Router from 'next/router';

interface DailyTaskBoardProps {
    initDispFlg: Boolean;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const DailyTaskBoard: React.FC<DailyTaskBoardProps> = (props) => {
    // デイリータスク
    const [dailyTaskList, setDailyTaskList] = useState<DailyTask[]>([]);
 
    useEffect(() => {
        props.setInitDispFlg(false);
        callGetDailyTaskList();
    }, [props.initDispFlg]);

    const callGetDailyTaskList = () => {
        var res: Promise<DailyTask[]> = getDailyTaskList();
        res.then(ret => setDailyTaskList(ret));
    }

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DailyTaskList key="DailyTaskList" dailyTaskList={dailyTaskList} setInitDispFlg={props.setInitDispFlg}/>
            </DndProvider>
        </div>
    )
}

async function getDailyTaskList(){
    var dailyTaskList : DailyTask[] = [];

    try {
        const res = await getApiClient().get(process.env.NEXT_PUBLIC_API_DAILY_TASK);
        dailyTaskList = createDailyTaskList(res.data);
    } catch(error){
        Router.push('/Error?400');
    }
    return dailyTaskList;
}

function createDailyTaskList(responseData: any[]): DailyTask[]{
    let length: number = responseData.length;
    var dailyTaskList :DailyTask[] = [];

    for (var i = 0 ; i < length ; i++) {

        let dailyTask = new DailyTask(responseData[i]["id"], responseData[i]["username"], 
        responseData[i]["title"], responseData[i]["description"], responseData[i]["priority"], 
        responseData[i]["quota"], responseData[i]["deleteFlg"], responseData[i]["createDate"],
        responseData[i]["doneDate"], responseData[i]["doneTime"]);

        dailyTaskList.push(dailyTask);
    }

    return dailyTaskList;
}

export default DailyTaskBoard;