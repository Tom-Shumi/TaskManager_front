import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import DailyTaskHistoryList from 'components/DailyTaskHistory/DailyTaskHistoryList';
import { DailyTaskHistory } from 'components/type/DailyTaskHistory';
import {getApiClient} from 'components/util/AuthenticationUtil';
import Router from 'next/router';
import * as DatePickerUtil from 'components/util/DatePickerUtil';
import styles from 'styles/DailyTaskHistoryBoard.module.css';
import * as Util from 'components/util/Util';


interface DailyTaskHistoryBoardProps {
    initDispFlg: Boolean;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    targetDate: Date;
    targetDateDiff: number;
    setTargetDateDiff: Dispatch<SetStateAction<number>>;
    showDailyTaskHistoryDetailModal: (dailyTaskHistoryList: DailyTaskHistory[], doneDate: Date) => void;
}

const DailyTaskHistoryBoard: React.FC<DailyTaskHistoryBoardProps> = (props) => {
    const [dailyTaskHistoryList, setDailyTaskHistoryList] = useState<DailyTaskHistory[][]>([]);

    useEffect(() => {
        props.setInitDispFlg(false);
        callGetDailyTaskHistoryList();
    }, [props.initDispFlg]);

    const callGetDailyTaskHistoryList = () => {
        let res: Promise<DailyTaskHistory[][]> = getDailyTaskHistoryList(props.targetDate);
        res.then(ret => {
            setDailyTaskHistoryList(ret);
        });
    }

    const loadNextHistory = () => {
        let nextTargetDate = new Date(props.targetDate)
        let diff = props.targetDateDiff + 5;
        nextTargetDate.setDate(nextTargetDate.getDate() - diff)

        try {

            getApiClient().get(Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY), {
                params: {
                    nextTargetDate: DatePickerUtil.dateStrYYYYMMDD(nextTargetDate)
                }
            }).then(res => {
                let taskCommentList = createDailyTaskHistoryList(res.data);
                setDailyTaskHistoryList([...dailyTaskHistoryList, ...taskCommentList])
                props.setTargetDateDiff(diff)
            })
        } catch(error){
            Router.push('/');
        }
    }

    return (
        <div>
            <DailyTaskHistoryList
                key="DailyTaskHistoryList"
                dailyTaskHistoryList={dailyTaskHistoryList}
                targetDate={props.targetDate}
                showDailyTaskHistoryDetailModal={props.showDailyTaskHistoryDetailModal}
            />

            <div className={styles.dailyTaskHistoryLoad} onClick={loadNextHistory}><i className="fa fa-arrow-circle-down faa-wrench animated-hover" /></div>
        </div>
    )
}

async function getDailyTaskHistoryList(date: Date){
    let dateStr = DatePickerUtil.dateStrYYYYMMDD(date)
    let dailyTaskHistoryList : DailyTaskHistory[][] = new Array();

    try {
        const res = await getApiClient().get(Util.env(process.env.NEXT_PUBLIC_API_DAILY_TASK_HISTORY), {
            params: {
                nextTargetDate: dateStr
            }
        });
        dailyTaskHistoryList = createDailyTaskHistoryList(res.data);
    } catch(error){
        Router.push('/');
    }
    return dailyTaskHistoryList;
}

function createDailyTaskHistoryList(responseData: any[]): DailyTaskHistory[][]{

    let outerLength: number = responseData.length;
    let dailyTaskHistoryList :DailyTaskHistory[][] = [];

    for (let i = 0; i < outerLength; i++) {

        let tempList = responseData[i]
        let innerLength = tempList.length;

        dailyTaskHistoryList[i] = new Array();

        for (let j = 0; j < innerLength; j++) {

            let dailyTaskHistory = new DailyTaskHistory(responseData[i][j]["dailyTaskId"], responseData[i][j]["title"],
            responseData[i][j]["doneDate"], responseData[i][j]["doneTime"], responseData[i][j]["quota"], responseData[i][j]["doneFlg"]);

            dailyTaskHistoryList[i].push(dailyTaskHistory);
        }
    }
    return dailyTaskHistoryList;
}

export default DailyTaskHistoryBoard;
