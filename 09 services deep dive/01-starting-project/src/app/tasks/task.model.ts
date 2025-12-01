import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

// ?190 Injecting Other Values(NOT Service)
type TaskStatusOptions = {
  value: 'open' | 'done' | 'in-progress';
  taskStatus: TaskStatus;
  text: string;
}[];
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-options'
);

// >189 Preparing Non-Class Value For Injection
export const TaskStatusOption =
  // : {
  //   value: 'open' | 'done' | 'in-progress';
  //   taskStatus: TaskStatus;
  //   text: string;
  // }[]
  [
    {
      value: 'open',
      taskStatus: 'OPEN',
      text: 'Open',
    },
    {
      value: 'in-progress',
      taskStatus: 'IN_PROGRESS',
      text: 'In-Progress',
    },
    {
      value: 'done',
      taskStatus: 'DONE',
      text: 'Completed',
    },
  ];

// ?190 Injecting Other Values(NOT Service)
export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOption,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
