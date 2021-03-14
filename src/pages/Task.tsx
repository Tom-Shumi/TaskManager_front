import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import {authentication} from '../components/Authentication';
import dynamic from "next/dynamic";


const Task: React.FC = () => {
    authentication();
    return (
        <Layout title="Task.">
            <TaskBoard />
            <Link href="/">
                <a>＜＜ Back to login page</a>
            </Link>
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