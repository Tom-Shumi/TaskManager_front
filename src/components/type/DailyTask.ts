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

  of = (responseData: any): DailyTask => {
    return new DailyTask(responseData["id"], responseData["username"],
    responseData["title"], responseData["description"], responseData["priority"],
    responseData["quota"], responseData["deleteFlg"], responseData["createDate"],
    responseData["deleteDate"], responseData["doneDate"], responseData["doneTime"], responseData["dispOrder"]);
  }

  doneFlg = () => {
    if (this.doneTime == null) return false;
    return this.quota <= this.doneTime
  }
}

export const of = (responseData: any): DailyTask => {
  return new DailyTask(responseData["id"], responseData["username"],
  responseData["title"], responseData["description"], responseData["priority"],
  responseData["quota"], responseData["deleteFlg"], responseData["createDate"],
  responseData["deleteDate"], responseData["doneDate"], responseData["doneTime"], responseData["dispOrder"]);
}
