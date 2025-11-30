import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

// bootstrapApplication(AppComponent).catch((err) => console.error(err));

// >182 Multiple Way Of Providing Service
// bootstrapApplication(AppComponent, {
//   providers: [TasksService],
// }).catch((err) => console.error(err));

// ?187 Using Custom DI Token & Providers
export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token'
);

bootstrapApplication(AppComponent, {
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
}).catch((err) => console.error(err));
