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
export {parseAsMoment, toUtcIso8601str, parseDate};