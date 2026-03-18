import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';

// import { TasksComponent } from './tasks/tasks.component';
// import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

// ?296 Introducing Route Guards
const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

// >268 Enabling Routing & Adding a First Route
export const routes: Routes = [
  // -270 Registering Multiple Routes
  {
    path: '', //- <your-domain>
    component: NoTaskComponent,

    // >295 Setting & Resolving Titles
    title: 'No task selected',

    // !283 Redirecting Users
    // redirectTo: '/users/u1',
    // pathMatch: 'full',
  },

  // {
  //   path: 'tasks', //- <your-domain>/tasks
  //   component: TasksComponent,
  // },

  // ?273 Setting Up & Navigating To Dynamic Routes
  {
    path: 'users/:userId', //- <your-domain>/users/<uid>
    component: UserTasksComponent,
    // >277 Working with Nested Routes
    children: userRoutes,

    // ?296 Introducing Route Guards
    canMatch: [dummyCanMatch],

    // ?290 Adding Static Data To Routes
    data: {
      message: 'Hello',
    },

    // >291 Resolving Route-related Dynamic Data
    resolve: {
      userName: resolveUserName,
    },

    // >295 Setting & Resolving Titles
    title: resolveTitle,

    // [
    //   // >283 Redirecting Users
    //   { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
    //   {
    //     path: 'tasks', //- <your-domain>/users/<uid>/tasks
    //     component: TasksComponent,
    //   },
    //   { path: 'tasks/new', component: NewTaskComponent },
    // ],
  },

  // ?282 Adding A "Not Found" Route
  {
    path: '**',
    component: NotFoundComponent,
  },
];
