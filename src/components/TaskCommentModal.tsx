import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';
import { Task } from '../components/interface';
import DatePicker, { registerLocale } from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import * as DatePickerUtil from './DatePickerUtil';
import * as ConversionUtil from './ConversionUtil';

registerLocale('ja', ja)


interface TaskCommentModalProps {
    close: () => void;
    setInitDispFlg: Dispatch<SetStateAction<Boolean>>;
    task: Task;
}


const TaskCommentModal: React.FC<TaskCommentModalProps> = (props) => {
　　
    // 初期表示処理
    useEffect(() => {        

    }, []);
  
    return (
        <Modal show={true} onHide={props.close} key='taskCommentModal'>
            <Modal.Header closeButton>
                <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" className="button_sm" >execute</Button>
                <Button variant="dark" onClick={props.close} className="button_sm" >close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TaskCommentModal;