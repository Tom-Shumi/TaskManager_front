import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import DailyTaskList from './DailyTaskList';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DailyTask } from '../common/interface';

interface DailyTaskBoardProps {
    initDispFlg: Boolean;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
}

const DailyTaskBoard: React.FC<DailyTaskBoardProps> = (props) => {
    // デイリータスク
    const [dailyTaskList, setDailyTaskList] = useState<DailyTask[]>([]);
 
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DailyTaskList key="DailyTaskList" />
            </DndProvider>
        </div>
    )
}

export default DailyTaskBoard;