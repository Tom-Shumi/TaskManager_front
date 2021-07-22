
const conversionStatus = (status: number) => {
    var str: string;
    switch(status) {
        case 1:
            str = 'Not Started';
            break;
        case 2:
            str = 'In Progress';
            break;
        case 3:
            str = 'Done';
            break;
    }
    return str;
}

const conversionStatusByTime = (quota: number, doneTime: number, deleteFlg: number) => {
    if (deleteFlg == 1) {
        return { str: "Delete", color: "gray" }
    }
    if (doneTime == 0 || doneTime == null) {

        return { str: conversionStatus(1), color: "yellow" }

    } else if (quota > doneTime) {

        return { str: conversionStatus(2), color: "white" }

    } else {

        return { str: conversionStatus(3), color: "gray" }

    }
}

const conversionPriority = (priority: number) => {
    var str: string;
    var className: string;
    switch(priority) {
        case 1:
            str = 'LOW';
            className = 'blue';
            break;
        case 2:
            str = 'MEDIUM';
            className = 'green';
            break;
        case 3:
            str = 'HIGH';
            className = 'red';
            break;
    }
    return { str: str, className: className }
}

const conversionDateStr = (status: number) => {
    // 日付表示文字列設定
    let dateStr: string;
    switch(status){
        case 1:
        case 2:
            dateStr = 'Plan Date';
            break;
        case 3:
            dateStr = 'Done Date';
            break;
    }
    return dateStr;
}


export {conversionStatus, conversionPriority, conversionDateStr, conversionStatusByTime};