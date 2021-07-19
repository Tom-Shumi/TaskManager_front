
export const convertHourMinute = (time: number) => {
    if (time == null) {
        return '0 m';
    }
    const hour: number = Math.floor(time / 60);
    const minute: number = time % 60;
    let hourMinute = ""
    if (hour < 0) {
        return "0 m"
    }
    if (hour != 0) {
        hourMinute += `${hour} h`
    }
    if (minute != 0) {
        hourMinute = hourMinute == "" ? hourMinute : hourMinute + " ";
        hourMinute += `${minute} m`;
    }
    return hourMinute == "" ? "0 m" : hourMinute;
}

export const convertRemaining = (quota: number, doneTime: number) => {
    if (doneTime == null) {
        return convertHourMinute(quota);
    } else {
        return convertHourMinute(quota - doneTime);
    }
}

export const isNumber = (str: string) => {
    // チェック条件パターン
    var pattern = /^[+,-]?([1-9]\d*|0)$/;
    // 数値チェック
    return pattern.test(str);
}