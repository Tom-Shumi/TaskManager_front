import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import TaskEditModal from '../components/TaskEditModal';
import {authentication} from '../components/Authentication';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';


const Task: React.FC = () => {
    // 初期表示フラグ
    const [taskCreateModalDispFlg, setTaskCreateModalDispFlg] = useState<Boolean>(false);

    authentication();

    const dispTaskCreateModal = () => {
        setTaskCreateModalDispFlg(true);
    }

    return (
        <Layout title="Task.">
            <Button key="create" variant="primary" className="button_md" onClick={dispTaskCreateModal}>create task</Button>
            <TaskBoard />
            <br />
            <Link href="/">
                <a>＜＜ Back to login page</a>
            </Link>
            {taskCreateModalDispFlg && 
                   <TaskEditModal />
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