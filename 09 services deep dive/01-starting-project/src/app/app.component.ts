import { Component, inject } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TasksComponent],
})
export class AppComponent {
  // !184 Understanding Ele Injector Behavior 衝突
  // private tasksService=inject(TasksService)
}
