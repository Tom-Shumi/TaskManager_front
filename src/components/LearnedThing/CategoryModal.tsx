import { useEffect, useState } from 'react';
import {Button, Col, Form, Modal, Row, Alert} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from 'recoil';
import { categoryModalDispFlgState, categoryListState } from './Atom';
import * as graphql from 'components/generated/graphql';
import Router from 'next/router';
import React from 'react';

const CategoryModal: React.FC = () => {

  const [categoryModalDispFlg, setCategoryModalDispFlgState] = useRecoilState(categoryModalDispFlgState);
  const [categoryList, _] = useRecoilState(categoryListState);
  const [tempCategoryList, setTempCategoryList] = useState(categoryList)
  const  [bulkRegisterCategory] = graphql.useBulkRegisterLearningCategoryMutation();
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openCategoryModal = () => {
    setCategoryModalDispFlgState(false);
  }

  const handleChange = (index: number) => (e: { target: { value: any; }; }) => {
    const list = tempCategoryList.map((obj) => Object.assign({},obj));
    list[index].name = e.target.value;
    setTempCategoryList(list);
  };

  const addCategory = () => {
    const nextId = Number(tempCategoryList[tempCategoryList.length - 1]?.id || 0) + 1;
    setTempCategoryList([...tempCategoryList, {id: nextId, name: ""}]);
  }

  const deleteCategory = (index: number) => {
    const list = tempCategoryList.map((obj) => Object.assign({},obj));
    list.splice(index, 1);
    setTempCategoryList(list);
  }

  const clearCategory = () => {
    setTempCategoryList(categoryList);
  }

  const registerCategory = () => {
    const params = tempCategoryList.map(
      (c) => convertCategoryInput(c)
    );

    bulkRegisterCategory({ variables: {learningCategoryList: params} , refetchQueries: ['listLearningCategory'] ,
      onError: (err) => {
        if (err.message == "Unexpected end of JSON input") {
          Router.push('/');
        }
        setErrorMessage(err.message);
        setErrorMessageShow(true);
      },
      onCompleted: () => {
        setCategoryModalDispFlgState(false);
      }
    });
  }

  const convertCategoryInput = (category: any): graphql.LearningCategoryInput => {
    return {id: category.id, name: category.name}
  }

  useEffect(() => {
    setTempCategoryList(categoryList)
  }, [categoryList]);

  return (
    <Modal show={categoryModalDispFlg} onHide={openCategoryModal} key='categoryModal'>
      <Modal.Header closeButton>
        <Modal.Title>Category Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessageShow && <Alert variant="danger" onClose={() => setErrorMessageShow(false)} dismissible>{errorMessage}</Alert>}
        <Form>
          <Row>
            {tempCategoryList.map((category, index) => (
              <React.Fragment key={"category" + category.id}>
                <Col xs={10} className="modalInput">
                  <Form.Control type="text" value={category.name} onChange={handleChange(index)} />
                </Col>
                <Col xs={2} className="modalInput">
                  <Button variant="danger" onClick={() => deleteCategory(index)} className="buttonDelete" >×</Button>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Form>
        <Button variant="warning" onClick={addCategory} className="buttonSm" >追加</Button>
        　※使用中のカテゴリは削除できません。
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={registerCategory} className="buttonSm" >登録</Button>
        <Button variant="outline-secondary" onClick={clearCategory} className="buttonSm" >クリア</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CategoryModal;
