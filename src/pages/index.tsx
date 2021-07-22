import React, { useState } from 'react';
import Router from 'next/router';
import {Container, Button, Form} from 'react-bootstrap';
import styles from '../styles/Index.module.css';
import Axios from "axios";

const index: React.FC = () => {

    const [username, setUsername] = useState<string>("shumiya");
    const [password, setPassword] = useState<string>("shumiya");
    // cookieを使用するaxios生成
    let client = Axios.create({withCredentials: true});

    // ログイン処理
    const login = () => {
        if (username == "" || password == "") {
            return false;
        }

        client.post(`${process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_LOGIN}`, createParams())
        .then(() => {
            console.log('login success');
            // セッションにログイン情報保持
            sessionStorage.clear();
            sessionStorage.setItem('n', username);

            Router.push('/Task');

        }).catch((err) => {
            console.log('err:', err.response);
            Router.push('/Error?401');
        })
    }

    const createUser = () => {
        if (username == "" || password == "") {
            return false;
        }

        client.post(`${process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_USER_NOAUTH}`
                    , createJsonParams()
                    , {headers: {'content-type': 'application/json'}})
        .then(() => {
            console.log('Success to create user');
            login()
        }).catch((err) => {
            console.log('err:', err.response);
            alert(err.response.data);
        })
    }

    const createParams = () => {
        var params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return params;
    }

    const createJsonParams = () => {
        var params = {
            username: username,
            password: password,
            enabledflg: 1,
            adminflg: 0
        }
        
        return JSON.stringify(params);
    }

    return (
        <div className="form_frame">
            <Container>
                <Form>
                    <p className={styles.login_str}>Task Manager</p>
                    <hr />
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User Name" onChange={(e: any) => setUsername(e.target.value)} value={username} />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e: any) => setPassword(e.target.value)} value={password} />
                    <br />
                    <Button variant="outline-primary" size="lg" block onClick={login}>Login</Button>
                    <br />
                    <br />
                    <Button variant="outline-success" size="lg" block onClick={createUser}>Create User</Button>
                </Form>
            </Container>
            <hr />
        </div>
    )
}
export default index;