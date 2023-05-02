export interface ICalculateCompoundInterestDTO {
  initialAmount: number;
  months: number;
  rate: number;
  monthlyAmount?: number;
  tax?: number;
}

export interface ICalculateCompoundInterestResponse {
  totalAmountWithInterestsAndTaxes: number;
  totalAmount: number;
  monthlyAmount: number;
  months: number;
  initialAmount: number;
  monthlyInterest: number;
  anuallyInterest: number;
  totalMonthlyAmount: number;
  totalAmountWithInterests: number;
  interestTotalAmount: number;
  taxRateTotalAmount: number;
  taxRate: number;
}
export class Calculator {
  calculateCompoundInterest(
    props: ICalculateCompoundInterestDTO
  ): ICalculateCompoundInterestResponse {
    const { initialAmount, months, rate, monthlyAmount, tax } = props;
    let totalAmountWithInterests = initialAmount;
    let interestTotalAmount = 0;
    for (let i = 0; i < months; i++) {
      const monthInterestAmount = this.calculateInterestAmount(
        totalAmountWithInterests,
        rate
      );
      totalAmountWithInterests += monthInterestAmount;
      totalAmountWithInterests += monthlyAmount || 0;
      interestTotalAmount += monthInterestAmount;
    }

    const taxRateTotalAmount = this.calculateTax(interestTotalAmount, tax || 0);

    return {
      initialAmount: initialAmount,
      monthlyAmount: monthlyAmount ?? 0,
      taxRate: tax ?? 0,
      monthlyInterest: rate,
      anuallyInterest: rate * 12,
      totalMonthlyAmount: (monthlyAmount && monthlyAmount * months) ?? 0,
      totalAmount: totalAmountWithInterests - interestTotalAmount,
      totalAmountWithInterests: totalAmountWithInterests,
      totalAmountWithInterestsAndTaxes:
        totalAmountWithInterests - taxRateTotalAmount,
      interestTotalAmount: interestTotalAmount - taxRateTotalAmount,
      taxRateTotalAmount,
      months,
    };
  }

  private calculateTax(interestTotalAmount: number, taxRate: number): number {
    if (taxRate === 0) return 0;
    return interestTotalAmount * (taxRate / 100);
  }

  private calculateInterestAmount(totalAmount: number, rate: number): number {
    return totalAmount * (rate / 100);
  }
}
