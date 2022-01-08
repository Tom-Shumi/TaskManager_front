import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import * as graphql from 'components/generated/graphql';
import List from 'components/LearnedThing/List';
import Router from 'next/router';
import { categoryListState, registerModalDispFlgState, categoryModalDispFlgState } from 'components/LearnedThing/Atom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import RegisterModal from 'components/LearnedThing/RegisterModal';
import CategoryModal from 'components/LearnedThing/CategoryModal';

const LearnedThing: React.FC = () => {

  const [, setCategoryList] = useRecoilState(categoryListState);
  const [, setRegisterModalDispFlgState] = useRecoilState(registerModalDispFlgState);
  const [, setCategoryModalDispFlgState] = useRecoilState(categoryModalDispFlgState);
  const { called: learningCalled, loading: learningLoading, data: learningData, error: learningError } = graphql.useListLearningInfoQuery();
  const [listLearningInfoLazyQuery] = graphql.useListLearningInfoLazyQuery({fetchPolicy: "network-only"});
  const { called: categoryCalled, loading: categoryLoading, data: categoryData, error: categoryError } = graphql.useListLearningCategoryQuery();
  const [learningList, setLearningList] = useState<any[]>([]);

  let categoryList: any[] = []
  useEffect(() => {
    setCategoryList(categoryList)
  }, [categoryData]);

  useEffect(() => {
    setLearningList(learningData?.listLearningInfo?? []);
  }, [learningData]);

  if (learningError || categoryError) Router.push('/');
  if (learningCalled && learningLoading && categoryCalled && categoryLoading) return <p>Loading ...</p>

  if (categoryData != null && categoryData.listLearningCategory != null) {
    categoryList = categoryData.listLearningCategory;
  }

  const openRegisterModal = () => {
    setRegisterModalDispFlgState(true);
  }

  const openCategoryModal = () => {
    setCategoryModalDispFlgState(true);
  }

  const loadNext = () => {
    if (learningList.length == 0) {
      return;
    }
    let maxId = learningList[learningList.length - 1].id
    listLearningInfoLazyQuery({ variables: {nextKey: maxId} } ).then(res => {
      if (checkDepulicate(learningList, res.data?.listLearningInfo?? [])) return;
      setLearningList(learningList.concat(res.data?.listLearningInfo));
    });
  }

  const checkDepulicate = (originalList: any[], addList: any[]): boolean => {
    if (addList.length == 0) return false;
    const target = addList[0];
    const index = originalList.length - 1;
    let result = false;

    Array.from(Array(5).keys()).forEach(count => {
      if (target.id == originalList[index - count].id) {
        result = true;
      }
    })

    return result;
  }

  return (
    <Layout title="Learned thing">
      <Button key="Register" onClick={openRegisterModal} variant="success" className="buttonMd marginSide10">登録</Button>
      <Button key="EditCategory" onClick={openCategoryModal} variant="info" className="buttonLg marginSide10">カテゴリー編集</Button>
      <input type="text" className="searchText marginSide10" placeholder="任意の文字列で検索できます。"/>
      <select>
        {categoryList.map(category => (
          <option key={`category${category.id}`} value={category.id || ""}>{category.name}</option>
        ))}
      </select>
      <Button key="Search" variant="primary" className="buttonMd marginSide10">検索</Button>
      <List key="list" learningList={learningList} />
      <RegisterModal />
      <CategoryModal />
      <div className="nextLoadIcon" onClick={loadNext} >
        <i className="fa fa-arrow-circle-down faa-wrench animated-hover" />
      </div>
    </Layout>
  )
}

export default LearnedThing;
