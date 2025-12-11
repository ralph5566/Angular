import { Permission } from './../../../../07 Ele with Directives/01-starting-project/src/app/auth/auth.model';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // >212 Signals
  clickCount = signal(0);

  // >214 Converting Signals To Observables
  clickCount$ = toObservable(this.clickCount);

  // ?215 Converting Observables To Signals
  //  預設沒有初始值 , { initialValue: 0 }
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  // ?213 Signals vs Observables
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);

  // >216 Creating & Using Custom Observables From Scratch
  customInterval$ = new Observable((subscriber) => {
    let timeExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error()
      if (timeExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({ message: 'New Value' });
      timeExecuted++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log(`Click button ${this.clickCount()} times`);
    // });
    // >214 Converting Signals To Observables
    // toObservable(this.clickCount);
  }

  // >210 Creating & Using Observable
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    // >216 Creating & Using Custom Observables From Scratch
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('COMPLETED'),
    });

    // ?213 Signals vs Observables
    // setInterval(() => {
    //   this.interval.update((preIntervalNum) => preIntervalNum + 1);
    // }, 1000);
    // const subscription = interval(1000).subscribe({
    // ?211 RxJS Operators
    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //     // complete: () => {},
    //     // error: () => {},
    //   });

    // >214 Converting Signals To Observables
    const subscription = this.clickCount$.subscribe({
      next: (val) => {
        console.log(`Click button ${this.clickCount()} times`);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // >212 Signals
  onClick() {
    this.clickCount.update((preCount) => preCount + 1);
  }
}
