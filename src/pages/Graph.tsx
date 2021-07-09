import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import TaskGraph from '../components/TaskBoard/TaskGraph';
import {authentication} from '../components/util/AuthenticationUtil';
import dynamic from "next/dynamic";


const Graph: React.FC = () => {

    authentication();

    return (
        <Layout title="Graph.">
            <TaskGraph />
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