import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';


const Task: React.FC = () => {
    return (
        <Layout title="Task.">
            <TaskBoard />
            <Link href="/">
                <a>＜＜ Back to index page</a>
            </Link>
        </Layout>
    )
}

export default Task;