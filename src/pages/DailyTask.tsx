import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import {authentication} from '../components/util/AuthenticationUtil';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import * as DatePickerUtil from '../components/util/DatePickerUtil';


const DailyTask: React.FC = () => {
    authentication();

    return (
        <Layout title={"Daily Task : " + DatePickerUtil.curentDateStrYYYYMMDD() + "."}>
          <Button key="create" variant="primary" className="button_md">create task</Button>

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