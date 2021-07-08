import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskBoard from '../components/TaskBoard';
import TaskEditModal from '../components/TaskEditModal';
import TaskCommentModal from '../components/TaskCommentModal';
import {authentication, logout} from '../components/Authentication';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import { Task as TaskClass } from '../components/interface';
import * as DatePickerUtil from '../components/DatePickerUtil';


const DailyTask: React.FC = () => {
    authentication();

    return (
        <Layout title={"Daily Task : " + DatePickerUtil.curentDateStrYYYYMMDD() + "."}>
          <Button key="create" variant="primary" className="button_md">create task</Button>
            <br />
            <div className="div_link">
                <div className="div_link_left">
                    <a onClick={logout} href="#">＜＜ Logout</a>
                </div>
            </div>
        </Layout>
    )
}

const DynamicTask = dynamic(
    {
      loader: async () => DailyTask,
    },
    { ssr: false }
  );
  
  export default DynamicTask;