
const conversionStatus = (status: number) => {
    var str: string;
    switch(status) {
        case 1:
            str = 'NOT STARTED';
            break;
        case 2:
            str = 'IN PROGRESS';
            break;
        case 3:
            str = 'DONE';
            break;
    }
    return str;
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


export {conversionStatus, conversionPriority, conversionDateStr};