import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';

const ZeroSecondThinking: React.FC = () => {

  return (
    <Layout title="0秒思考">
      <Link href="/ZeroSecondThinkingList">
        <Button key="ZeroSecondThinkingList" variant="success" className="buttonLg">＜ 0秒思考 一覧</Button>
      </Link>
      0秒思考実施
    </Layout>
  )
}

export default ZeroSecondThinking;
