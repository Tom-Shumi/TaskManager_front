import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import TaskEditModal from '../components/TaskEditModal';
import TaskCommentModal from '../components/TaskCommentModal';
import {authentication} from '../components/Authentication';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import { Task as TaskClass } from '../components/interface';


const Graph: React.FC = () => {

    authentication();

    return (
        <Layout title="Graph.">

            <br />
            <Link href="/Task">
                <a>＜＜ Back to Task page</a>
            </Link>
        </Layout>
    )
}

const DynamicGraph = dynamic(
    {
      loader: async () => Graph,
    },
    { ssr: false }
  );
  
  export default DynamicGraph;