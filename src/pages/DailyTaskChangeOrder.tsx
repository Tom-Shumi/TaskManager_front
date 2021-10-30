import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import DailyTaskList from 'components/DailyTaskChangeOrder/DailyTaskList';
import dynamic from "next/dynamic";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const DailyTaskChangeOrder: React.FC = () => {

  return (
    <Layout title="DailyTask Change Order">
        <Link href="/DailyTask">
          <Button key="dailyTaskBoard" variant="success" className="buttonLg">＜ Daily Task Board</Button>
        </Link>
        <DndProvider backend={HTML5Backend}>
          <DailyTaskList />
        </DndProvider>
    </Layout>
  )
}

export default DailyTaskChangeOrder;
