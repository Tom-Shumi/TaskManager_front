import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import styles from '../../styles/DailyTaskItem.module.css';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

interface DailyTaskItemProps {

}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {
 
    return (
        <div className={styles.daily_task_item}>
            <div className={styles.title}>アプリ開発 [Done]</div>
            <Row>
                <Col xs={2} className={styles.quota_label}>[Quota] 2h</Col>
                <Col xs={2} className={styles.label}>[Done] 1h</Col>
                <Col xs={3} className={styles.label}>[Remaining] 1h</Col>
                <Col xs={5}>
                    [logged]
                    <Form.Control type="text" className={styles.done_time_textbox}/> m
                    <Button variant="primary" className={styles.done_time_button}>Done</Button>
                </Col>
            </Row>
            
        </div>
    )
}

export default DailyTaskItem;