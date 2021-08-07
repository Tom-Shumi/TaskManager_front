import Router from 'next/router';
import { useState } from "react";
import Axios from "axios";

const getSessionUsername = (): String => {
    return sessionStorage.getItem('n');
}

export const authentication = () => {
    const [username] = useState<String>(getSessionUsername());
    if (username == null){
        Router.push('/Error?401');
    }
}

export const logout = () => {
    sessionStorage.clear();
    Router.push('/');
}

export const getUsername = () => {
    const [username] = useState<String>(getSessionUsername());
    return username;
}

export const getApiClient = () => {
    return Axios.create({
        baseURL: process.env.API_SERVER,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true });
}
