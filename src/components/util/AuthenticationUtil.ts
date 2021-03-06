import Router from 'next/router';
import { useState } from "react";
import Axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig }= getConfig();


const getSessionUsername = (): String | null => {
    return sessionStorage.getItem('n');
}

export const authentication = () => {
    const [username] = useState<String | null>(getSessionUsername());
    if (username == null){
        Router.push('/Error?401');
    }
}

export const logout = () => {
    sessionStorage.clear();
    Router.push('/');
}

export const getUsername = () => {
    const [username] = useState<String | null>(getSessionUsername());
    return username;
}

export const getApiClient = () => {
    return Axios.create({
        baseURL: publicRuntimeConfig.NEXT_PUBLIC_API_SERVER,
        headers: {'Content-Type': 'application/json'},
        withCredentials: true });
}
