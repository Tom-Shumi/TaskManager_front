import moment from 'moment';

const nowUnixDate = (): number => {
    return moment()
      .clone()
      .unix() * 1000
}

const parseUnixDate = (dateStr): number => {
  if (!dateStr) {
    return -1
  } else {
    return Date.parse(dateStr);
  }
}

const parseRequestString = (unixDate: number): String => {
  let date = new Date(unixDate);
  return dateStrDelimiterYYYYMMDD(date);
}

const curentDateStrYYYYMMDD = (): String => {
  let today = new Date();
  return today.getFullYear() + "-" + String((today.getMonth() + 1)).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
}

const dateStrDelimiterYYYYMMDD = (date: Date): String => {
  return date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
}

const dateStrYYYYMMDD = (date: Date): String => {
  return String(date.getFullYear()) + String((date.getMonth() + 1)).padStart(2, '0') + String(date.getDate()).padStart(2, '0');
}

export {nowUnixDate, parseUnixDate, parseRequestString, curentDateStrYYYYMMDD, dateStrDelimiterYYYYMMDD, dateStrYYYYMMDD};
