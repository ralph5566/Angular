import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Click! 123!');
  // }

  label = input.required<string>();
  private el = inject(ElementRef);

  // ?133 ContentChild example
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  // -136 afterRender afterNextRender
  constructor() {
    // 變更後執行
    afterRender(() => {
      console.log('AfterRender');
    });

    // 整個程序變更後執行
    afterNextRender(() => {
      console.log('AfterNextRender');
    });
  }

  // >134 AfterContentInit 保證 content 初始化完成
  ngAfterContentInit() {
    // console.log('After Content Init');
  }

  onClick() {
    console.log('Click!');
    console.log(this.el);
    console.log(this.control());
  }
}
