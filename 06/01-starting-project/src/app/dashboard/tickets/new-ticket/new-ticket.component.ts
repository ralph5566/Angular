import {
  Component,
  ElementRef,
  viewChild,
  ViewChild,
  viewChildren,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
  output,
} from '@angular/core';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // ?133 ViewChild example
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // -140 Component Output
  // @Output() add = new EventEmitter<{ title: string; text: string }>();
  add = output<{ title: string; text: string }>();

  // >134 ngOnInit 元件初始化
  ngOnInit(): void {
    console.log('OnInit');
    console.log(this.form?.nativeElement);
    // console.log(this.form().nativeElement);
  }

  // >134 AfterViewInit 保證元件的 view 初始化完成
  ngAfterViewInit() {
    console.log('After View Init');
    console.log(this.form?.nativeElement);
    // console.log(this.form().nativeElement);
  }

  // onSubmit(titleEle: HTMLInputElement) {
  onSubmit(titleEle: string, textEle: string) {
    // form: HTMLFormElement

    // const enterTitle = titleEle.value;
    // console.dir(enterTitle);

    console.log(titleEle, textEle);

    // -140 Component Output
    this.add.emit({ title: titleEle, text: textEle });

    // form.reset();

    this.form?.nativeElement.reset();
    // this.form()?.nativeElement.reset();
  }
}
