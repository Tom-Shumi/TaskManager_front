import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import DailyTaskList from 'components/DailyTaskChangeOrder/DailyTaskList';

const DailyTaskChangeOrder: React.FC = () => {

  return (
    <Layout title="DailyTask Change Order">
        <Link href="/DailyTask">
          <Button key="dailyTaskBoard" variant="success" className="buttonLg">＜ Daily Task Board</Button>
        </Link>

        <DailyTaskList />
    </Layout>
  )
}

export default DailyTaskChangeOrder;
