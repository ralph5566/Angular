import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  // ?200 Understanding the OnPush Strategy 避免不必要更新
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent {
  // ?202 Using Signals for Sharing Data Across Component(OnPush)
  private messagesService = inject(MessagesService);
  // add = output<string>();

  enteredText = signal('');

  // >203 Problem with OnPush,Cross-Component Data & Not Using Signal
  // enteredText = '';

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    // ?202 Using Signals for Sharing Data Across Component(OnPush)
    this.messagesService.addMessage(this.enteredText());
    // this.add.emit(this.enteredText());

    this.enteredText.set('');

    // >203 Problem with OnPush,Cross-Component Data & Not Using Signal
    // this.messagesService.addMessage(this.enteredText);
    // this.enteredText = '';
  }
}
