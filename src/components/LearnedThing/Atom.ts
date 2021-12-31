import { atom } from "recoil";

export const initDispFlgState = atom<boolean>({
    key: "initDispFlg",
    default: true
});
