import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';
import Timer from 'components/ZeroSecondThinking/Timer';
import Form from 'components/ZeroSecondThinking/Form';

const ZeroSecondThinking: React.FC = () => {

  return (
    <Layout title="0秒思考">
      <Link href="/ZeroSecondThinkingList">
        <Button key="ZeroSecondThinkingList" variant="success" className="buttonLg">過去の0秒思考一覧</Button>
      </Link>
      <Timer timerSecond={5}/>
      <Form />
    </Layout>
  )
}

export default ZeroSecondThinking;
