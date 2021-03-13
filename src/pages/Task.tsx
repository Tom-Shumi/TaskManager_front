import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import {authentication} from '../components/Authentication';


const Task: React.FC = () => {
    authentication(sessionStorage);
    return (
        <Layout title="Task.">
            <TaskBoard />
            <Link href="/">
                <a>＜＜ Back to login page</a>
            </Link>
        </Layout>
    )
}

export default Task;