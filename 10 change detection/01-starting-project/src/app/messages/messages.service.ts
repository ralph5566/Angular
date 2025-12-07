import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // ?204 Triggering Change Detection Manually & Using RxJS Subjects
  //   messages$ = new BehaviorSubject<string[]>([]);

  // >203 Problem with OnPush,Cross-Component Data & Not Using Signal
  //   private messages: string[] = [];
  //   get allMessages() {
  //     return [...this.messages];
  //   }
  //   addMessage(message: string) {
  //     this.messages = [...this.messages, message];
  //     ?204 Triggering Change Detection Manually & Using RxJS Subjects
  //     this.messages$.next(this.messages);
  //   }

  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
}
