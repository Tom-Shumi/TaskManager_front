import { atom } from "recoil";

export const registerModalDispFlgState = atom<boolean>({
    key: "registerModalDispFlg",
    default: false
});

export const categoryModalDispFlgState = atom<boolean>({
    key: "categoryModalDispFlg",
    default: false
});

export const categoryListState = atom<any[]>({
    key: "categoryList",
    default: []
});

export const learningListState = atom<any[]>({
    key: "learningList",
    default: []
});
