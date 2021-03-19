import React, { useState } from 'react';
import Router from 'next/router';
import {Container, Button, Form} from 'react-bootstrap';
import styles from '../styles/Index.module.css';
import Axios from "axios";

const index: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    // ログイン処理
    const login = () => {
        if (username == "" || password == "") {
            return false;
        }
        getPreloginAndPostLogin();
    }
    // プレログインapi実行＆成功したらログイン関数呼び出し
    const getPreloginAndPostLogin = () => {
        client.get(process.env.NEXT_PUBLIC_API_SERVER + "/prelogin")
        .then(res_prelogin => {
            console.log('prelogin success');
            
            var params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            params.append('_csrf', res_prelogin.data);

            postLogin(params);

        }).catch(() => {
            Router.push('/Error?401');
        });
    }
    // ログインapi実行
    const postLogin = (params: URLSearchParams) => {
        client.post(process.env.NEXT_PUBLIC_API_SERVER + "/login", params)
        .then( _ => {
            console.log('login success');
            // セッションにログイン情報保持
            sessionStorage.clear();
            sessionStorage.setItem('n', username);

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