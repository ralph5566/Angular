import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';
import { appConfig } from './app/app.config';

bootstrapApplication(
  AppComponent,

  // >268 Enabling Routing & Adding a First Route
  appConfig,
  // {
  //   providers: [
  //     provideRouter(
  //       routes,
  //       // [
  //       //   {
  //       //     path: 'tasks', // -<your-domain>/tasks
  //       //     component: TasksComponent,
  //       //   },
  //       // ]
  //     ),
  //   ],
  // }
).catch((err) => console.error(err));
