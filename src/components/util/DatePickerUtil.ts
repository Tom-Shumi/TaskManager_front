import moment from 'moment';

/**
 * JST基準に変換して返す
 * @param {string} dateTimeStr YYYY-MM-DDTHH:mm:00Z
 * @returns {moment.Moment}
 */
const parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DDTHH:mm:00Z', 'ja').utcOffset(9)
}

  /**
   * 日付形式に変換して返す
   * @param {moment.Moment} momentInstance
   * @returns {string}
   */
const toUtcIso8601str = (momentInstance) => {
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

export {parseAsMoment, toUtcIso8601str, parseDate, curentDateStrYYYYMMDD, dateStrDelimiterYYYYMMDD, dateStrYYYYMMDD};
