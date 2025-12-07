import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  // ?200 Understanding the OnPush Strategy
  changeDetection: ChangeDetectionStrategy.OnPush,
  // >205 async Pipe
  imports: [AsyncPipe],
})
export class MessagesListComponent {
  // ?202 Using Signals for Sharing Data Across Component(OnPush)
  private messagesService = inject(MessagesService);
  messages = this.messagesService.allMessages;
  // messages = input.required<string[]>();

  // >205 async Pipe
  // messages$ = this.messagesService.messages$;

  // ?204 Triggering Change Detection Manually & Using RxJS Subjects
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // >203 Problem with OnPush,Cross-Component Data & Not Using Signal
  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  // ?204 Triggering Change Detection Manually & Using RxJS Subjects
  // messages: string[] = [];
  // ngOnInit() {
  //   const subscription = this.messagesService.messages$.subscribe((msg) => {
  //     this.messages = msg;
  //     this.cdRef.markForCheck();
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
