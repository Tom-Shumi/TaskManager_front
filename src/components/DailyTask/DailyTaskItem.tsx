import React, { Dispatch, SetStateAction, useState, useEffect} from 'react';
import styles from '../../styles/DailyTaskItem.module.css';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

interface DailyTaskItemProps {

}

const DailyTaskItem: React.FC<DailyTaskItemProps> = (props) => {
 
    return (
        <div className={styles.daily_task_item}>
            <div className={styles.title}>アプリ開発 [Done]</div>
            <Container>
                <Row>
                    <Col xs={4} className={styles.label}>[Quota] 2h</Col>
                    <Col xs={4} className={styles.label}>[Achievement ratio] 80%</Col>
                    <Col xs={4}>
                        [Done time]
                        <Form.Control type="text" className={styles.done_time_textbox}/> m
                        <Button variant="primary" className={styles.done_time_button}>Done</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DailyTaskItem;