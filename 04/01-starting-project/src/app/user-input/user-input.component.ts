import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InvestmentService } from './../investment.service';
import type { InvestmentInput } from '../investment-input.model';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  // standalone: true,
  // imports: [FormsModule],
})
export class UserInputComponent {
  // @Output() calculate = new EventEmitter<InvestmentInput>();

  // ? signal
  // calculate = output<InvestmentInput>();

  // {
  //   initialInvestment: number;
  //   annualInvestment: number;
  //   expectedReturn: number;
  //   duration: number;
  // }
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    console.log('submit');
    // console.log(this.enteredInitialInvestment);
    // console.log(this.enteredAnnualInvestment);
    // console.log(this.enteredExpectedReturn);
    // console.log(this.enteredDuration);

    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      annualInvestment: +this.enteredAnnualInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration(),
    });

    // this.calculate.emit({
    // initialInvestment: +this.enteredInitialInvestment,
    // annualInvestment: +this.enteredAnnualInvestment,
    // expectedReturn: +this.enteredExpectedReturn,
    // duration: +this.enteredDuration,

    //   initialInvestment: +this.enteredInitialInvestment(),
    //   annualInvestment: +this.enteredAnnualInvestment(),
    //   expectedReturn: +this.enteredExpectedReturn(),
    //   duration: +this.enteredDuration(),
    // });

    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }
}
