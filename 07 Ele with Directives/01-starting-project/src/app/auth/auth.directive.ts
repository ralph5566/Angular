import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  // ?158 Another Directive
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);

  // >159 Custom Structural Directive
  private template = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    // ?158 Another Directive
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        // console.log('SHOW ELEMENT');
        // >159 Custom Structural Directive
        this.viewContainer.createEmbeddedView(this.template);
      } else {
        // console.log('DO NOT SHOW ELEMENT');
        // >159 Custom Structural Directive
        this.viewContainer.clear();
      }
    });
  }
}
