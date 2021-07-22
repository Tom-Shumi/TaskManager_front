import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import TaskEditModal from '../components/TaskBoard/TaskEditModal';
import TaskCommentModal from '../components/TaskBoard/TaskCommentModal';
import {authentication, logout} from '../components/util/AuthenticationUtil';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import { Task as TaskClass } from '../components/common/interface';

const Task: React.FC = () => {
    // タスク作成モーダル表示フラグ
    const [taskCreateModalDispFlg, setTaskCreateModalDispFlg] = useState<Boolean>(false);
    // タスク更新モーダル表示フラグ
    const [taskUpdateModalDispFlg, setTaskUpdateModalDispFlg] = useState<Boolean>(false);
    // タスクコメントモーダル表示フラグ
    const [taskCommentModalDispFlg, setTaskCommentModalDispFlg] = useState<Boolean>(false);
    // 初期表示フラグ
    const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);
    // 編集対象タスク
    const [targetTask, setTargetTask] = useState<TaskClass>(null);

    authentication();

    const showTaskCreateModal = (task: TaskClass) => {
        setTargetTask(task);
        setTaskCreateModalDispFlg(true);
    }

    const closeTaskCreateModal = () => {
        setTaskCreateModalDispFlg(false);
    }

    const showTaskUpdateModal = (task: TaskClass) => {
        setTargetTask(task);
        setTaskUpdateModalDispFlg(true);
    }

    const closeTaskUpdateModal = () => {
        setTaskUpdateModalDispFlg(false);
    }

    const showTaskCommentModal = (task: TaskClass) => {
        setTargetTask(task);
        setTaskCommentModalDispFlg(true);
    }

    const closeTaskCommentModal = () => {
        setTaskCommentModalDispFlg(false);
    }

    return (
        <Layout title="Task Board.">
            <Button key="create" variant="primary" className="button_md" onClick={ () => showTaskCreateModal(null)}>Create Task</Button>
            <TaskBoard
                initDispFlg = {initDispFlg}
                setInitDispFlg = {setInitDispFlg}
                showTaskUpdateModal = {showTaskUpdateModal}
                showTaskCommentModal = {showTaskCommentModal} />
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
            {taskCommentModalDispFlg && 
                <TaskCommentModal 
                    close = {closeTaskCommentModal}
                    task = {targetTask}
                />
            }
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