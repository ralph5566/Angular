import { Routes } from '@angular/router';

import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  // >283 Redirecting Users
  { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
  {
    path: 'tasks', //- <your-domain>/users/<uid>/tasks
    component: TasksComponent,

    // ?294 Controlling Route Resolver Execution
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',

    // ?300 Reloading Pages via the Angular Router & Configuring Programmatic Navigation
    runGuardsAndResolvers: 'always',

    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    // >298 Making Sense of The CanDeactivate Guard
    canDeactivate: [canLeaveEditPage],
  },
];
