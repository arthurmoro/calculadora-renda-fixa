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
      interestTotalAmount: interestTotalAmount,
      taxRateTotalAmount,
      months,
    };
  }

  private calculateTax(interestTotalAmount: number, taxRate: number): number {
    if (taxRate === 0) return 0;
    return interestTotalAmount * (taxRate / 100);
  }

  /**
   * Calcula o valor dos juros com base na taxa mensal
   * @param totalAmount Valor total sobre o qual os juros serão calculados
   * @param rate Taxa de juros mensal (em percentual)
   * @returns Valor dos juros calculados
   */
  private calculateInterestAmount(totalAmount: number, rate: number): number {
    return totalAmount * (rate / 100);
  }

  /**
   * Calcula o valor dos juros com base na taxa anual, convertendo para mensal
   * @param totalAmount Valor total sobre o qual os juros serão calculados
   * @param annualRate Taxa de juros anual (em percentual)
   * @returns Valor dos juros calculados usando a taxa mensal equivalente
   */
  private calculateInterestAmountFromAnnualRate(
    totalAmount: number,
    annualRate: number
  ): number {
    const monthlyRate = annualRate / 12;
    return this.calculateInterestAmount(totalAmount, monthlyRate);
  }
}
