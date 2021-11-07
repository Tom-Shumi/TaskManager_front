import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';

const ZeroSecondThinking: React.FC = () => {

  return (
    <Layout title="0秒思考">
      <Link href="/ZeroSecondThinkingList">
        <Button key="ZeroSecondThinkingList" variant="success" className="buttonLg">過去の0秒思考一覧</Button>
      </Link>
      0秒思考実施
    </Layout>
  )
}

export default ZeroSecondThinking;
