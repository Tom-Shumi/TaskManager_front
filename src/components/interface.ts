export class Task {
    taskTitle: string;
    description: string;
    priority: number;

    constructor(taskTitle: string, description: string, priority: number) {
      this.taskTitle = taskTitle;
      this.description = description;
      this.priority = priority;
    }
  }