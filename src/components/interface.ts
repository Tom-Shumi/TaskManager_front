export class Task {
    id: number;
    taskTitle: string;
    description: string;
    priority: number;
    status: number;

    constructor(id: number, taskTitle: string, description: string, priority: number, status: number) {
      this.id = id;
      this.taskTitle = taskTitle;
      this.description = description;
      this.priority = priority;
      this.status = status;
    }
  }

export const ItemTypes = {
  TASK_ITEM: 'task_item',
}