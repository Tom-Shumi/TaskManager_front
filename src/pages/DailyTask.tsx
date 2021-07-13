import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import {authentication} from '../components/util/AuthenticationUtil';
import dynamic from "next/dynamic";
import {Button} from 'react-bootstrap';
import * as DatePickerUtil from '../components/util/DatePickerUtil';
import DailyTaskBoard from '../components/DailyTask/DailyTaskBoard';


const DailyTask: React.FC = () => {
    // 初期表示フラグ
    const [initDispFlg, setInitDispFlg] = useState<Boolean>(true);

    authentication();

    return (
        <Layout title={"Daily Task : " + DatePickerUtil.curentDateStrYYYYMMDD() + "."}>
          <Button key="create" variant="primary" className="button_md margin_side_10">create task</Button>
          <Button key="history" variant="success" className="button_md">history</Button>
          <div className="display_inline margin_side_10">Achievement : 5 of 10</div>

          <DailyTaskBoard
            initDispFlg = {initDispFlg}
            setInitDispFlg = {setInitDispFlg}
          />
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