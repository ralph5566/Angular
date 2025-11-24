import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input, input } from '@angular/core';

import { InvestmentService } from './../investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
  // standalone: true,
  // imports: [CurrencyPipe],
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  // get results() {
  //   return this.investmentService.resultData;
  // }

  // results = computed(() => this.investmentService.resultData());
  results = this.investmentService.resultData.asReadonly();

  // results = input<
  //   {
  //     year: number;
  //     interest: number;
  //     valueEndOfYear: number;
  //     annualInvestment: number;
  //     totalInterest: number;
  //     totalAmountInvested: number;
  //   }[]
  // >();

  // @Input() results?: {
  //   year: number;
  //   interest: number;
  //   valueEndOfYear: number;
  //   annualInvestment: number;
  //   totalInterest: number;
  //   totalAmountInvested: number;
  // }[];
}
