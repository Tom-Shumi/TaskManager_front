import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import DailyTaskList from './DailyTaskList';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

interface DailyTaskBoardProps {

}

const DailyTaskBoard: React.FC<DailyTaskBoardProps> = (props) => {
 
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DailyTaskList key="DailyTaskList" />
            </DndProvider>
        </div>
    )
}

export default DailyTaskBoard;