import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AuthComponent, LearningResourcesComponent, NgIf],
})
export class AppComponent {
  // ?153 Built-in Structural Directives
  private authService = inject(AuthService);

  // ?153 Built-in Structural Directives
  isAdmin = computed(() => this.authService.activePermission() === 'admin');
}
