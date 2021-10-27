import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import DailyTaskList from 'components/DailyTask/DailyTaskList';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DailyTask } from 'components/type/DailyTask';
import * as DailyTaskUtil from 'components/type/DailyTask';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import * as NumberUtil from 'components/util/NumberUtil';
import * as Util from 'components/util/Util';

interface DailyTaskBoardProps {
    initDispFlg: Boolean;
    includeDeleteFlg: number;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    setTotalTaskCount: Dispatch<SetStateAction<number>>;
    setDoneTaskCount: Dispatch<SetStateAction<number>>;
    setTotalDoneTime: Dispatch<SetStateAction<string>>;
    showDailyTaskEditModal: (dailyTask: DailyTask) => void;
}

const DailyTaskBoard: React.FC<DailyTaskBoardProps> = (props) => {
    // デイリータスク
    const [dailyTaskList, setDailyTaskList] = useState<DailyTask[]>([]);

    useEffect(() => {
        props.setInitDispFlg(false);
        callGetDailyTaskList();
    }, [props.initDispFlg, props.includeDeleteFlg]);

    const callGetDailyTaskList = () => {
        var res: Promise<DailyTask[]> = getDailyTaskList(props.includeDeleteFlg);
        res.then(ret => {
            setDailyTaskList(ret);
            let doneTaskCount = 0;
            let totalDoneTime = 0;
            let deleteTaskCount = 0;
            for (var i = 0 ; i < ret.length ; i++) {
                if (ret[i].deleteFlg == 1) {
                    deleteTaskCount++;
                    continue;
                }
                if (ret[i].quota <= ret[i].doneTime) {
                    doneTaskCount++;
                }
                totalDoneTime += ret[i].doneTime
            }
            props.setTotalTaskCount(ret.length - deleteTaskCount);
            props.setDoneTaskCount(doneTaskCount);
            props.setTotalDoneTime(NumberUtil.convertHourMinute(totalDoneTime));
        });
    }

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DailyTaskList
                    key="DailyTaskList"
                    dailyTaskList={dailyTaskList}
                    setInitDispFlg={props.setInitDispFlg}
                    showDailyTaskEditModal={props.showDailyTaskEditModal}
                />
            </DndProvider>
        </div>
    )
}

async function getDailyTaskList(includeDeleteFlg: number){

    var dailyTaskList : DailyTask[] = [];

    try {
        const res = await getApiClient().get(Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK), {
            params: {
                includeDeleteFlg: includeDeleteFlg
            }
        });
        dailyTaskList = createDailyTaskList(res.data);
    } catch(error){
        Router.push('/');
    }
    return dailyTaskList;
}

function createDailyTaskList(responseData: any[]): DailyTask[]{
    let length: number = responseData.length;
    var dailyTaskList :DailyTask[] = [];

    for (var i = 0 ; i < length ; i++) {
        dailyTaskList.push(DailyTaskUtil.of(responseData[i]));
    }

    return dailyTaskList;
}

export default DailyTaskBoard;
