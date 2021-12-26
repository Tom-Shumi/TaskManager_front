import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';

const LearnedThing: React.FC = () => {

  return (
    <Layout title="Learned thing">
      <Button key="LearnedThingRegister" variant="success" className="buttonMd marginSide10">登録</Button>
      <Button key="LearnedThingRegister" variant="info" className="buttonLg marginSide10">カテゴリー編集</Button>
      <input type="text" className="searchText marginSide10" placeholder="任意の文字列で検索できます。"/>
      <select>
        <option key="category1" value="1">ALL</option>
        <option key="category2" value="2">プログラミング</option>
      </select>
      <Button key="ZeroSecondThinking" variant="primary" className="buttonMd marginSide10">検索</Button>
    </Layout>
  )
}

export default LearnedThing;
