import React from 'react';
import {Button} from 'react-bootstrap';
import Axios from "axios";
import Router from 'next/router';

const TaskEditModal: React.FC = () => {

    // cookieを使用するaxios生成
    let client = Axios.create({ withCredentials: true });

    const createTask = () => {

        var params = new URLSearchParams();
        params.append('task', '');
        params.append('priority', '');
        params.append('status', '');
        params.append('description', '');
    
        client.post(process.env.NEXT_PUBLIC_API_SERVER + process.env.NEXT_PUBLIC_API_TASK, params)
        .then( response => {


            Router.push('/Task');

        }).catch(() => {
            Router.push('/Error?400');
        })
    }

    return (
        <div>aa</div>
    )
}

export default TaskEditModal;