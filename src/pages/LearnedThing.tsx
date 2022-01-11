import Layout from 'components/common/Layout';
import {Button} from 'react-bootstrap';
import * as graphql from 'components/generated/graphql';
import List from 'components/LearnedThing/List';
import Router from 'next/router';
import { categoryListState, registerModalDispFlgState, categoryModalDispFlgState, learningListState } from 'components/LearnedThing/Atom';
import { useRecoilState } from 'recoil';
import { useEffect, useState, useRef } from 'react';
import RegisterModal from 'components/LearnedThing/RegisterModal';
import CategoryModal from 'components/LearnedThing/CategoryModal';

const LearnedThing: React.FC = () => {

  const [, setCategoryList] = useRecoilState(categoryListState);
  const [, setRegisterModalDispFlgState] = useRecoilState(registerModalDispFlgState);
  const [, setCategoryModalDispFlgState] = useRecoilState(categoryModalDispFlgState);
  const { called: learningCalled, loading: learningLoading, data: learningData, error: learningError } = graphql.useListLearningInfoQuery();
  const [listLearningInfoLazyQuery, {data: learningLazyData}] = graphql.useListLearningInfoLazyQuery({fetchPolicy: "network-only"});
  const { called: categoryCalled, loading: categoryLoading, data: categoryData, error: categoryError } = graphql.useListLearningCategoryQuery();
  const [learningList, setLearningList] = useRecoilState(learningListState);
  const [searchText, setSearchText] = useState("");
  const searchedText = useRef("");
  const [searchCategory, setSearchCategory] = useState("");
  const searchedCategory = useRef("");

  let categoryList: any[] = []
  useEffect(() => {
    setCategoryList(categoryList)
  }, [categoryData]);

  useEffect(() => {
    if (learningList.length == 0) {
      setLearningList(learningData?.listLearningInfo?? []);
    }
  }, [learningData]);

  useEffect(() => {
    if (learningLazyData?.listLearningInfo != null
      && learningLazyData?.listLearningInfo.length != 0
      && checkDepulicate(learningList, learningLazyData?.listLearningInfo)) {
      setLearningList(learningList.concat(learningLazyData?.listLearningInfo));
    }
  }, [learningLazyData]);

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

  const search = () => {
    searchedText.current = searchText;
    searchedCategory.current = searchCategory;

    setLearningList([])
    listLearningInfoLazyQuery({ variables: {search: searchedText.current, categoryId: Number(searchedCategory.current)} } )
  }

  const loadNext = () => {
    if (learningList.length == 0) {
      return;
    }
    let maxId = learningList[learningList.length - 1].id
    listLearningInfoLazyQuery({ variables: {search: searchedText.current, categoryId: Number(searchedCategory.current), nextKey: maxId} } )
  }

  const checkDepulicate = (originalList: any[], addList: any[]): boolean => {

    if (originalList.length == 0 || addList.length == 0) return true;
    const target = addList[0];
    const index = originalList.length - 1;
    let result = true;

    Array.from(Array(2).keys()).forEach(count => {
      if (target.id == originalList[index - count].id) {
        result = false;
      }
    })

    return result;
  }

  const handleChangeSearchText = () => {
    return (e:any) => setSearchText(e.target.value);
  }

  const handleChangeSearchCategory = () => {
    return (e:any) => setSearchCategory(e.target.value);
  }

  return (
    <Layout title="Learned thing">
      <Button key="Register" onClick={openRegisterModal} variant="success" className="buttonMd marginSide10">登録</Button>
      <Button key="EditCategory" onClick={openCategoryModal} variant="info" className="buttonLg marginSide10">カテゴリー編集</Button>
      <input type="text" value={searchText} onChange={handleChangeSearchText()} className="searchText marginSide10" placeholder="任意の文字列で検索できます。"/>
      <select value={searchCategory} onChange={handleChangeSearchCategory()}>
          <option key="category0" value="">ALL</option>
        {categoryList.map(category => (
          <option key={`category${category.id}`} value={category.id || ""}>{category.name}</option>
        ))}
      </select>
      <Button key="Search" variant="primary" className="buttonMd marginSide10" onClick={search}>検索</Button>
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
