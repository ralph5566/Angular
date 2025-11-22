import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  host: { id: 'status' },
})
export class ServerStatusComponent implements OnInit {
  //  OnDestroy
  // private interval?: NodeJS.Timeout;
  // private interval?: ReturnType<typeof setInterval>;

  private destroyRef = inject(DestroyRef);

  // currentStatus: 'offline' | 'online' | 'unknown' = 'offline';

  // >137 Signals 綁定變更 及時 =>
  currentStatus = signal<'offline' | 'online' | 'unknown'>('offline');

  // >137
  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  // !138 Signal Effects Cleanup Functions
  //   effect((onCleanup) => {
  //   const tasks = getTasks();
  //   const timer = setTimeout(() => {
  //     console.log(`Current number of tasks: ${tasks().length}`);
  //   }, 1000);
  //   onCleanup(() => {
  //     clearTimeout(timer);
  //   });
  // });

  // constructor() {
  //   setInterval(() => {
  //     const rnd = Math.random();

  //     if (rnd < 0.5) {
  //       this.currentStatus = 'online';
  //     } else if (rnd < 0.8) {
  //       this.currentStatus = 'offline';
  //     } else {
  //       this.currentStatus = 'unknown';
  //     }
  //   }, 5000);
  // }

  ngOnInit() {
    console.log('On Init');

    // this.interval = setInterval(() => {
    // setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();

      // if (rnd < 0.5) {
      //   this.currentStatus = 'online';
      // } else if (rnd < 0.8) {
      //   this.currentStatus = 'offline';
      // } else {
      //   this.currentStatus = 'unknown';
      // }

      // >137 Signals 更新方式
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.8) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit() {
    console.log('After View Init');
  }

  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  // }
}
