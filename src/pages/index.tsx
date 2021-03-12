import React, { useState } from 'react';
import Link from 'next/link';
import {Container, Button, Form} from 'react-bootstrap';
import styles from '../styles/Index.module.css';
import Axios from "axios";

const index: React.FC = () => {

    const [token, setToken] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    let client = Axios.create({ withCredentials: true });

    const login = () =>{
        if (username == "" || password == "") {
            return false;
        }
        client.get(process.env.NEXT_PUBLIC_API_SERVER + "/prelogin")
                .then(res_prelogin => {
                    
                    var params = new URLSearchParams();
                    params.append('username', username);
                    params.append('password', password);
                    params.append('_csrf', res_prelogin.data);

                    client.post(process.env.NEXT_PUBLIC_API_SERVER + "/login", params)
                    .then(res_login => {
                        console.log('login success')
                        
                        console.log(res_login.headers['set-cookie']);

                        client.post(process.env.NEXT_PUBLIC_API_SERVER + "/task", {
                            task: "test",
                            priority: 1,
                            status: 1,
                            _csrf: res_prelogin.data
                        }).then(
                            res_task => {
                                console.log('task success')
                            }
                        ).catch(() => {
                            console.log('task error')
                        })


                    }).catch(() => {
                        console.log('login error');
                    })

                }).catch(() => {
                    console.log('prelogin error');
                });
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
            <Link href="/Task">
                <a>Go to TaskList ＞＞</a>
            </Link>
        </div>
    )
}
export default index;