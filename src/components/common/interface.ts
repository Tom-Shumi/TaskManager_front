export class Task {
  id: number;
  taskTitle: string;
  description: string;
  priority: number;
  status: number;
  planDate: string;
  doneDate: string;
  comments: TaskComment[];

  constructor(id: number, taskTitle: string, description: string, priority: number, status: number, planDate: string, doneDate: string, comments: TaskComment[]) {
    this.id = id;
    this.taskTitle = taskTitle;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.planDate = planDate;
    this.doneDate = doneDate;
    this.comments = comments;
  }
}

export class TaskComment {
  id: number;
  taskId: number;
  username: string;
  comment: string;
  createDate: string;

  constructor(id: number, taskId: number, username: string, comment: string, createDate: string) {
    this.id = id;
    this.taskId = taskId;
    this.username = username;
    this.comment = comment;
    this.createDate = createDate;
  }
}

export class TaskGraph {
  date: string;
  count: number;

  constructor(date: string, count: number) {
    this.date = date;
    this.count = count;
  }
}

export const ItemTypes = {
  TASK_ITEM: 'task_item',
}

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

  constructor(id: number, username: string, title: string, description: string,
     priority: number, quota: number, deleteFlg: number, createDate: string, deleteDate: string, doneDate: string, doneTime: number) {
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
  }
}

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