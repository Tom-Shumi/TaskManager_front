import { useState } from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from 'recoil';
import { registerModalDispFlgState, categoryListState } from './Atom';
import * as graphql from 'components/generated/graphql';
import Router from 'next/router';

interface RegisterModalProps {

}

const RegisterModal: React.FC<RegisterModalProps> = (props) => {

  const [registerModalDispFlg, setRegisterModalDispFlgState] = useRecoilState(registerModalDispFlgState);
  const [categoryList, _] = useRecoilState(categoryListState);
  const [input, setInput] = useState({content: '', referenceUrl: '', categoryId: ''});
  const  [registerLearning, { error: registerLearningError }] = graphql.useRegisterLearningMutation();
  if (registerLearningError) Router.push('/');

  const handleChange = (inputName: string) => (e: { target: { value: any; }; }) => {
    setInput({...input, [inputName] : e.target.value});
  };

  const openRegisterModal = () => {
    setRegisterModalDispFlgState(false);
  }

  const registerLearningInfo = () => {
    if (input.content == '') return;
    registerLearning({ variables:  {content: input.content,
                                    categoryId: Number(input.categoryId),
                                    referenceUrl: input.referenceUrl} ,
                      refetchQueries: ['listLearningInfo'] })
    setRegisterModalDispFlgState(false);
    setInput({content: '', referenceUrl: '', categoryId: ''})
  }

  return (
    <Modal show={registerModalDispFlg} onHide={openRegisterModal} key='registerModal'>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col xs={4} className="modalLabel">
                    <strong>Category</strong>
                  </Col>
                  <Col xs={8} className="modalInput">
                    <Form.Control as="select" value={input.categoryId} onChange={handleChange('categoryId')} >
                      {categoryList.map(category => (
                        <option key={`category${category.id}`} value={category.id || ""}>{category.name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col xs={4} className="modalLabel">
                    <strong>Content</strong>
                  </Col>
                  <Col xs={8} className="modalInput">
                    <Form.Control type="text" value={input.content} onChange={handleChange('content')} />
                  </Col>
                  <Col xs={4} className="modalLabel">
                    <strong>Reference url</strong>
                  </Col>
                  <Col xs={8} className="modalInput">
                    <Form.Control type="text" value={input.referenceUrl} onChange={handleChange('referenceUrl')} />
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={registerLearningInfo} className="buttonSm" >登録</Button>
              <Button variant="dark" onClick={openRegisterModal} className="buttonSm" >閉じる</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterModal;
