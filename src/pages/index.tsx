import React, { useState } from 'react';
import Router from 'next/router';
import {Container, Button, Form} from 'react-bootstrap';
import styles from '../styles/Index.module.css';
import {getApiClient} from '../components/Authentication';

const index: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // cookieを使用するaxios生成
    let client = getApiClient();

    // ログイン処理
    const login = () => {
        if (username == "" || password == "") {
            return false;
        }
        postToken();
    }

    // ログインapi実行
    const postToken = () => {
        var params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        client.post(`${process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_LOGIN}`, params)
        .then( response => {
            console.log('login success');
            // セッションにログイン情報保持
            sessionStorage.clear();
            sessionStorage.setItem('n', username);
            sessionStorage.setItem('t', response.headers['authorization']);
            console.log(response.headers)
            console.log(response.headers['authorization'])
            

            Router.push('/Task');

        }).catch(() => {
            Router.push('/Error?401');
        })
    }

    return (
        <div className="form_frame">
            <Container>
                <Form>
                    <p className={styles.login_str}>Login</p>
                    <hr />
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User Name" onChange={(e: any) => setUsername(e.target.value)} value={username} />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e: any) => setPassword(e.target.value)} value={password} />
                    <br />
                    <Button variant="outline-primary" size="lg" block onClick={login}>Login</Button>
                </Form>
            </Container>
            <hr />
        </div>
    )
}
export default index;