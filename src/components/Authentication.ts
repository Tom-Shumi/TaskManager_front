import Router from 'next/router';

export function authentication(storage) {
    if (storage.getItem('n') == null) {
        Router.push('/Error');
    }
}