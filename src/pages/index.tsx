import React from 'react';
import Link from 'next/link';
import {Container, Button, Form} from 'react-bootstrap';
import styles from '../styles/Index.module.css';
import axios from "axios";

const index: React.FC = () => {
    return (
        <div className="form_frame">
            <Container>
                <Form>
                    <p className={styles.login_str}>Login</p>
                    <hr />
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User Name" />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <br />
                    <Button variant="outline-primary" size="lg" block>Login</Button>
                </Form>
            </Container>
            <hr />
            <Link href="/Task">
                <a>Go to TaskList ＞＞</a>
            </Link>
        </div>
    )
}
export default index;