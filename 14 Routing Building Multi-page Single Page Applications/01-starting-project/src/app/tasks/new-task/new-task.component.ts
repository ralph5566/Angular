import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);

  // ?299 Improving The CanDeactivate Logic
  submitted = false;

  // >281 Link Shortcuts & Programmatic Navigation
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId(),
    );

    // ?299 Improving The CanDeactivate Logic
    this.submitted = true;

    // >281 Link Shortcuts & Programmatic Navigation
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}

// >298 Making Sense of The CanDeactivate Guard
export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component,
) => {
  // ?299 Improving The CanDeactivate Logic
  if (component.submitted) {
    return true;
  }

  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    window.confirm(
      'Do you really want to leave?You will lose the entered data',
    );
  }

  return true;
};
