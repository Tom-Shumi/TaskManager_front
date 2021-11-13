import { atom } from "recoil";

export const isRunningState = atom<boolean>({
    key: "isRunning",
    default: false
});
