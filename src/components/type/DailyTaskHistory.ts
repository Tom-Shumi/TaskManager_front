export class DailyTaskHistory {
  dailyTaskId: number;
  title: string;
  doneDate: string;
  doneTime: number;
  quota: number;
  doneFlg: number;

  constructor(dailyTaskId: number, title: string, doneDate: string, doneTime: number, quota: number, doneFlg: number) {
    this.dailyTaskId = dailyTaskId;
    this.title = title;
    this.doneDate = doneDate;
    this.doneTime = doneTime;
    this.quota = quota;
    this.doneFlg = doneFlg;
  }
}
