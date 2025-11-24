import { Component, input, output, signal } from '@angular/core';

import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  // >142 Input & Signal
  // ?145 Input & Output
  // ?145 @Input({}) ...
  // ?145 input<Ticket>(null,{alias: 'data'| transform: (value) => {}})
  data = input.required<Ticket>();

  // ?143 Signal Value
  detailVisible = signal(false);
  // -144 Cross Component Communication
  // >145 Input & Output
  // >145 @Output('closeTicket')
  // >145 close = output({alias: 'closeTicket'})
  close = output();

  onToggleDetails() {
    // this.detailVisible.set(!this.detailVisible());
    this.detailVisible.update((visible) => !visible);
  }

  // -144 Cross Component Communication
  onMarkAsCompleted() {
    this.close.emit();
  }
}
