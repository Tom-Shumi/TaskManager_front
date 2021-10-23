export class DailyTask {
  id: number;
  username: string;
  title: string;
  description: string;
  priority: number;
  quota: number;
  deleteFlg: number;
  createDate: string;
  deleteDate: string;
  doneDate: string;
  doneTime: number;
  dispOrder: number;

  constructor(id: number, username: string, title: string, description: string,
    priority: number, quota: number, deleteFlg: number, createDate: string, deleteDate: string, doneDate: string, doneTime: number, dispOrder: number) {
    this.id = id;
    this.username = username;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.quota = quota;
    this.deleteFlg = deleteFlg;
    this.createDate = createDate;
    this.deleteDate = deleteDate;
    this.doneDate = doneDate;
    this.doneTime = doneTime;
    this.dispOrder = dispOrder
  }

  doneFlg = () => {
    if (this.doneTime == null) return false;
    return this.quota <= this.doneTime
  }
}
