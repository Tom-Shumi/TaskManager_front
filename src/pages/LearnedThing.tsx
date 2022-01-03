import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import * as graphql from 'components/generated/graphql';
import List from 'components/LearnedThing/List';
import Router from 'next/router';
import { categoryListState, registerModalDispFlgState } from 'components/LearnedThing/Atom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import RegisterModal from 'components/LearnedThing/RegisterModal';

const LearnedThing: React.FC = () => {

  const [, setCategoryList] = useRecoilState(categoryListState);
  const [, setRegisterModalDispFlgState] = useRecoilState(registerModalDispFlgState);
  const { called: learningCalled, loading: learningloading, data: learningData, error: learningError } = graphql.useListLearningInfoQuery();
  const { called: categoryCalled, loading: categoryLoading, data: categoryData, error: categoryError } = graphql.useListLearningCategoryQuery();

  let learningList: any[] = []
  let categoryList: any[] = []
  useEffect(() => {
    setCategoryList(categoryList)
  }, [categoryData]);

  if (learningError || categoryError) Router.push('/');
  if (learningCalled && learningloading && categoryCalled && categoryLoading) return <p>Loading ...</p>

  if (learningData != null && learningData.listLearningInfo != null) {
    learningList = learningData.listLearningInfo;
  }

  if (categoryData != null && categoryData.listLearningCategory != null) {
    categoryList = categoryData.listLearningCategory;
  }

  const openRegisterModal = () => {
    setRegisterModalDispFlgState(true);
  }

  return (
    <Layout title="Learned thing">
      <Button key="Register" onClick={openRegisterModal} variant="success" className="buttonMd marginSide10">登録</Button>
      <Button key="EditCategory" variant="info" className="buttonLg marginSide10">カテゴリー編集</Button>
      <input type="text" className="searchText marginSide10" placeholder="任意の文字列で検索できます。"/>
      <select>
        {categoryList.map(category => (
          <option key={`category${category.id}`} value={category.id || ""}>{category.name}</option>
        ))}
      </select>
      <Button key="ZeroSecondThinking" variant="primary" className="buttonMd marginSide10">検索</Button>
      <List key="list" learningList={learningList} />
      <RegisterModal />
    </Layout>
  )
}

export default LearnedThing;
