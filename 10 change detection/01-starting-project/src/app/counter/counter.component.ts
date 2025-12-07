import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  // ?200 Understanding the OnPush Strategy
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// >198 Avoiding Zone Pollution implement OnInit
export class CounterComponent implements OnInit {
  count = signal(0);

  // >198 Avoiding Zone Pollution
  private zone = inject(NgZone);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  // >198 Avoiding Zone Pollution
  ngOnInit() {
    setTimeout(() => {
      this.count.set(0);
    }, 2000);

    // !198 避免Zone.js汙染?
    // >207 Going Zoneless
    // this.zone.runOutsideAngular(() => {
    setTimeout(() => {
      console.log('Timer expired');
    }, 4000);
    // });
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
