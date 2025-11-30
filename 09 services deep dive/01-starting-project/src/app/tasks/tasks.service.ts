import { inject, Injectable, signal } from '@angular/core';

import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// ?176 Creating Service
// !181 Multiple Injectors =>Error
// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  //   task = signal<Task[]>([]);

  // >185 Injecting Service Into Service
  private loggingService = inject(LoggingService);

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

    // >185 Injecting Service Into Service
    this.loggingService.log('ADDED TASK with title ' + taskData.title);
  }

  // ?180 Outsourcing & Reusing Logic with Service
  updateTasksStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // >185 Injecting Service Into Service
    this.loggingService.log('ADDED TASK STATUS TO' + newStatus);
  }
}
