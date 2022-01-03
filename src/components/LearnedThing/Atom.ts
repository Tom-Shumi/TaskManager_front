import { atom } from "recoil";

export const registerModalDispFlgState = atom<boolean>({
    key: "registerModalDispFlg",
    default: false
});

export const categoryListState = atom<any[]>({
    key: "categoryList",
    default: []
});
