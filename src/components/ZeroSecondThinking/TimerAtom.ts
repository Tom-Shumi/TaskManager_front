import { atom } from "recoil";

export const isRunningState = atom<boolean>({
    key: "isRunning",
    default: false
});

export const isFinishedState = atom<boolean>({
    key: "isFinished",
    default: false
});
