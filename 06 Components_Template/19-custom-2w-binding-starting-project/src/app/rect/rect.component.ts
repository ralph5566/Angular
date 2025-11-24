import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  // ?147 Custom Two-Binding
  // @Input({ required: true }) size!: { width: string; height: string };
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  // >148 Other Custom Two-Binding
  size = model.required<{ width: string; height: string }>();

  onReset() {
    // ?147 Custom Two-Binding
    // this.sizeChange.emit({ width: '200', height: '100' });

    // >148 Other Custom Two-Binding
    // this.size.update(() => ({ width: '200', height: '100' }));
    this.size.set({ width: '200', height: '100' });
  }
}
