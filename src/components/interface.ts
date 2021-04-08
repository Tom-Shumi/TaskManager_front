export class Task {
    id: number;
    taskTitle: string;
    description: string;
    priority: number;
    status: number;
    planDate: string;
    doneDate: string;

    constructor(id: number, taskTitle: string, description: string, priority: number, status: number, planDate: string, doneDate: string) {
      this.id = id;
      this.taskTitle = taskTitle;
      this.description = description;
      this.priority = priority;
      this.status = status;
      this.planDate = planDate;
      this.doneDate = doneDate;
    }
  }

export const ItemTypes = {
  TASK_ITEM: 'task_item',
}