import { Directive } from '@angular/core';

// >154 Custom Directive
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true, //- no NgModule
  // ?155 Attribute Directives
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log('SafeLinkDirective active');
  }

  // ?155 Attribute Directives
  onConfirmLeavePage(event: MouseEvent) {
    const wantToLeave = window.confirm('Leave App?');

    if (wantToLeave) {
      return;
    }

    event?.preventDefault();
  }
}
