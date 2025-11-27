import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

// >154 Custom Directive
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true, //- no NgModule
  // ?155 Attribute Directives
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  // >156 Custom Directive Navigation
  queryParam = input('myapp', { alias: 'appSafeLink' });

  // ?157 Directive & Dependency Injection
  private hostEleRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective active');
  }

  // ?155 Attribute Directives
  onConfirmLeavePage(event: MouseEvent) {
    const wantToLeave = window.confirm('Leave App?');

    if (wantToLeave) {
      // >156 Custom Directive Navigation
      // const address = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href =
      //   address + '?from=' + this.queryParam();

      // ?157 Directive & Dependency Injection
      const address = this.hostEleRef.nativeElement.href;
      this.hostEleRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event?.preventDefault();
  }
}
