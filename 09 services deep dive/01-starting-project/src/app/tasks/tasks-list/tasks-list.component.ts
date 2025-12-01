import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import {
  TASK_STATUS_OPTIONS,
  TaskStatusOption,
  taskStatusOptionsProvider,
} from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],

  // ?190 Injecting Other Values(NOT Service)
  // providers: [{ provide: TASK_STATUS_OPTIONS, useValue: TaskStatusOption }],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  // >179 Alternative Dependency Injection Syntax
  // private tasksService = inject(TasksService);

  // ?188 Using Custom DI Token & Providers
  private tasksService = inject(TasksServiceToken);

  // selectedFilter = signal<string>('all');
  // tasks = [];

  // ?190 Injecting Other Values(NOT Service)
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  // >179 Alternative Dependency Injection Syntax
  // tasks = this.tasksService.allTasks;

  // ?180 Outsourcing & Reusing Logic with Service
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
