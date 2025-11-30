import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { TasksServiceToken } from './../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // >177 Provide Service
  // private tasksService: TasksService;
  // constructor() {
  //   this.tasksService = new TasksService();
  // }

  // ?178 Dependency Injection Mechanism
  // constructor(private tService: TasksService) {
  //   this.tasksService = tService;
  // }
  // constructor(private tasksService: TasksService) {}

  // ?187 Using Custom DI Token & Providers
  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}

  onAddTask(title: string, description: string) {
    // >177 Provide Service
    this.tasksService.addTask({ title, description });

    this.formEl()?.nativeElement.reset();
  }
}
