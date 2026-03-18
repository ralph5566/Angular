import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  // userTasks: Task[] = [];

  // ?279 Accessing Parent Route Data From Inside Nested Routes
  userId = input.required<string>();

  // ?287 Extracting Query Parameters via Inputs
  // order = input<'asc' | 'desc'>();

  // >288 Extracting Query Parameters via Observables
  // order?: 'asc' | 'desc';

  // ?289 Using Query Parameters For Data Manipulation
  order = signal<'asc' | 'desc'>('desc');

  // >280 Loading Data Based On Route Parameters In Child Routes
  private tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())

      // ?289 Using Query Parameters For Data Manipulation
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      }),
  );

  // >288 Extracting Query Parameters via Observables
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        // this.order = params['order'];

        // ?289 Using Query Parameters For Data Manipulation
        this.order.set(params['order']);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
