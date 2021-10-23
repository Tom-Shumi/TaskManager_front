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
