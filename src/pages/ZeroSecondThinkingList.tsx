import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import Link from 'next/link';

const ZeroSecondThinkingList: React.FC = () => {

  return (
    <Layout title="0秒思考">
      <Link href="/ZeroSecondThinking">
        <Button key="ZeroSecondThinking" variant="success" className="buttonLg">0秒思考 実施 ＞</Button>
      </Link>
      0秒思考リスト
    </Layout>
  )
}

export default ZeroSecondThinkingList;
