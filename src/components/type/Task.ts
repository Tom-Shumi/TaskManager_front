

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
