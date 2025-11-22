import { Component, signal } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import type { InvestmentInput } from './investment-input.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // standalone: true,
  // imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  // resultsData = signal<
  //   | {
  //       year: number;
  //       interest: number;
  //       valueEndOfYear: number;
  //       annualInvestment: number;
  //       totalInterest: number;
  //       totalAmountInvested: number;
  //     }[]
  //   | undefined
  // >(undefined);
  // resultsData?: {
  //   year: number;
  //   interest: number;
  //   valueEndOfYear: number;
  //   annualInvestment: number;
  //   totalInterest: number;
  //   totalAmountInvested: number;
  // }[];
  // onCalculateInvestmentResults(
  //   data: InvestmentInput
  //   // {
  //   //   initialInvestment: number;
  //   //   annualInvestment: number;
  //   //   expectedReturn: number;
  //   //   duration: number;
  //   // }
  // ) {
  //   const { initialInvestment, annualInvestment, expectedReturn, duration } =
  //     data;
  //   const annualData = [];
  //   let investmentValue = initialInvestment;
  //   for (let i = 0; i < duration; i++) {
  //     const year = i + 1;
  //     const interestEarnedInYear = investmentValue * (expectedReturn / 100);
  //     investmentValue += interestEarnedInYear + annualInvestment;
  //     const totalInterest =
  //       investmentValue - annualInvestment * year - initialInvestment;
  //     annualData.push({
  //       year: year,
  //       interest: interestEarnedInYear,
  //       valueEndOfYear: investmentValue,
  //       annualInvestment: annualInvestment,
  //       totalInterest: totalInterest,
  //       totalAmountInvested: initialInvestment + annualInvestment * year,
  //     });
  //   }
  //   // console.log(annualData);
  //   // this.resultsData = annualData;
  //   // signal
  //   this.resultsData.set(annualData);
  //   // return annualData;
  // }
}
