export class Calculator {
  calculateCompoundInterest(
    initialAmount: number,
    months: number,
    rate: number,
    monthlyAmount?: number,
    tax?: number
  ): {
    totalAmount: number;
    interestTotalAmount: number;
    taxRateTotalAmount: number;
  } {
    let totalAmount = initialAmount;
    let interestTotalAmount = 0;
    for (let i = 0; i < months; i++) {
      const monthInterestAmount = totalAmount * (rate / 100);
      totalAmount += monthInterestAmount;
      interestTotalAmount += monthInterestAmount;

      totalAmount = totalAmount + (monthlyAmount || 0);
    }

    const taxRateTotalAmount = interestTotalAmount * ((tax && tax / 100) || 0);

    return {
      totalAmount: totalAmount - taxRateTotalAmount,
      interestTotalAmount: interestTotalAmount - taxRateTotalAmount,
      taxRateTotalAmount,
    };
  }
}
