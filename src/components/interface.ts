export class Task {
    id: number;
    taskTitle: string;
    description: string;
    priority: number;

    constructor(id: number, taskTitle: string, description: string, priority: number) {
      this.id = id;
      this.taskTitle = taskTitle;
      this.description = description;
      this.priority = priority;
    }
  }