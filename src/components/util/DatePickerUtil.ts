  /**
   * 日付形式に変換して返す
   * @param {moment.Moment} momentInstance
   * @returns {string}
   */
const toString = (momentInstance) => {
    return momentInstance
      .clone()
      .utc()
      .format('YYYY-MM-DDTHH:mm:00Z')
}

const parseDate = (dateStr) => {
  if (!dateStr) {
    return ""
  } else {
    return Date.parse(dateStr);
  }
}

const curentDateStrYYYYMMDD = () => {
  let today = new Date();
  return today.getFullYear() + "-" + String((today.getMonth() + 1)).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
}

const dateStrDelimiterYYYYMMDD = (date: Date) => {
  return date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
}

const dateStrYYYYMMDD = (date: Date) => {
  return String(date.getFullYear()) + String((date.getMonth() + 1)).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
}

export {toString, parseDate, curentDateStrYYYYMMDD, dateStrDelimiterYYYYMMDD, dateStrYYYYMMDD};
