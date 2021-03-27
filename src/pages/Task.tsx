import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import TaskEditModal from '../components/TaskEditModal';
import {authentication} from '../components/Authentication';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import { Task as TaskClass } from '../components/interface';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const Task: React.FC = () => {
    // タスク作成モーダル表示フラグ
    const [taskCreateModalDispFlg, setTaskCreateModalDispFlg] = useState<Boolean>(false);
    // タスク更新モーダル表示フラグ
    const [taskUpdateModalDispFlg, setTaskUpdateModalDispFlg] = useState<Boolean>(false);
    // 初期表示フラグ
    const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);
    // 編集対象タスク
    const [targetTask, setTargetTaskk] = useState<TaskClass>(null);

    authentication();

    const showTaskCreateModal = (task: TaskClass) => {
        setTargetTaskk(task);
        setTaskCreateModalDispFlg(true);
    }

    const closeTaskCreateModal = () => {
        setTaskCreateModalDispFlg(false);
    }

    const showTaskUpdateModal = (task: TaskClass) => {
        setTargetTaskk(task);
        setTaskUpdateModalDispFlg(true);
    }

    const closeTaskUpdateModal = () => {
        setTaskUpdateModalDispFlg(false);
    }

    return (
        <Layout title="Task.">
            <DndProvider backend={HTML5Backend}>
                <Button key="create" variant="primary" className="button_md" onClick={ () => showTaskCreateModal(null)}>create task</Button>
                <TaskBoard
                    initDispFlg = {initDispFlg}
                    setInitDispFlg = {setInitDispFlg}
                    show = {showTaskUpdateModal} />
                <br />
                <Link href="/">
                    <a>＜＜ Back to login page</a>
                </Link>
                {taskCreateModalDispFlg && 
                    <TaskEditModal 
                        close = {closeTaskCreateModal}
                        execSbt = "1"
                        setInitDispFlg = {setInitDispFlg}
                        task = {targetTask}
                    />
                }
                {taskUpdateModalDispFlg && 
                    <TaskEditModal 
                        close = {closeTaskUpdateModal}
                        execSbt = "2"
                        setInitDispFlg = {setInitDispFlg}
                        task = {targetTask}
                    />
                }
            </DndProvider>
        </Layout>
    )
}

const DynamicTask = dynamic(
    {
      loader: async () => Task,
    },
    { ssr: false }
  );
  
  export default DynamicTask;