import { atom } from "recoil";

export const initDispFlgState = atom<boolean>({
    key: "initDispFlg",
    default: true
});

export const categoryListState = atom<any[]>({
    key: "categoryList",
    default: []
});
