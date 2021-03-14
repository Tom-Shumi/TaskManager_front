import Router from 'next/router';
import { useState } from "react";

const getSessionUsername = (): String => {
    return sessionStorage.getItem('n');
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