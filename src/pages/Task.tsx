import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import TaskEditModal from '../components/TaskEditModal';
import {authentication} from '../components/Authentication';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';


const Task: React.FC = () => {
    // モーダル表示フラグ
    const [taskCreateModalDispFlg, setTaskCreateModalDispFlg] = useState<Boolean>(false);
    // 初期表示フラグ
    const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);

    authentication();

    const showTaskEditModal = () => {
        setTaskCreateModalDispFlg(true);
    }

    const CloseTaskEditModal = () => {
        setTaskCreateModalDispFlg(false);
    }

    return (
        <Layout title="Task.">
            <Button key="create" variant="primary" className="button_md" onClick={showTaskEditModal}>create task</Button>
            <TaskBoard
                initDispFlg = {initDispFlg}
                setInitDispFlg = {setInitDispFlg} />
            <br />
            <Link href="/">
                <a>＜＜ Back to login page</a>
            </Link>
            {taskCreateModalDispFlg && 
                <TaskEditModal 
                    show = {showTaskEditModal}
                    close = {CloseTaskEditModal}
                    title = "Create task"
                    setInitDispFlg = {setInitDispFlg}
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