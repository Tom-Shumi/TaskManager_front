import Router from 'next/router';
import { useState } from "react";
import Axios from "axios";

const getSessionUsername = (): String => {
    return sessionStorage.getItem('n');
}

const getSessionJwtToken = (): String => {
    return sessionStorage.getItem('t');
}


export const authentication = () => {
    const [username] = useState<String>(getSessionUsername());
    if (username == null){
        Router.push('/Error?401');
    }
}

export const getUsername = () => {
    const [username] = useState<String>(getSessionUsername());
    return username;
}

export const getApiClient = () => {
    return Axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_SERVER,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getSessionJwtToken()
        },
        withCredentials: true });
}