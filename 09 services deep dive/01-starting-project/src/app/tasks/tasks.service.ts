import { Injectable, signal } from '@angular/core';

import { Task, TaskStatus } from './task.model';

// ?176 Creating Service
// !181 Multiple Injectors =>Error
// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  //   task = signal<Task[]>([]);

  // >179 Alternative Dependency Injection Syntax
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }

  // ?180 Outsourcing & Reusing Logic with Service
  updateTasksStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }
}
