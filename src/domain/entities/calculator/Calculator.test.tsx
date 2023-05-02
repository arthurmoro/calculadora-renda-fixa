import { Calculator } from "./Calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should calculate compound interest correctly without optional parameters", () => {
    const initialAmount = 100;
    const months = 1;
    const rate = 100;
    const expectedAmount = 200;

    const result = calculator.calculateCompoundInterest({
      initialAmount,
      months,
      rate,
    });

    expect(result.totalAmount).toEqual(expectedAmount);
    expect(result.interestTotalAmount).toEqual(100);
  });

  it("should calculate compound interest correctly with monthlyAmount and tax parameters", () => {
    const initialAmount = 100;
    const monthlyAmount = 100;
    const months = 2;
    const rate = 1;
    const expectedAmount = 303.01;

    const result = calculator.calculateCompoundInterest({
      initialAmount,
      months,
      rate,
      monthlyAmount,
    });

    expect(result.totalAmount).toEqual(expectedAmount);
    expect(result.interestTotalAmount.toFixed(2)).toEqual((3.01).toFixed(2));
  });

  it("should calculate compound interest correctly with monthlyAmount parameter", () => {
    const initialAmount = 10000;
    const monthlyAmount = 1000;
    const months = 12;
    const rate = 0.98;
    const expectedAmount = 23909.9;

    const result = calculator.calculateCompoundInterest({
      initialAmount,
      months,
      rate,
      monthlyAmount,
    });

    expect(result.totalAmount.toFixed()).toEqual(expectedAmount.toFixed());
  });

  it("should calculate compound interest correctly with tax parameter", () => {
    const initialAmount = 10000;
    const monthlyAmount = 5000;
    const months = 36;
    const rate = 1.13;
    const tax = 15;

    const result = calculator.calculateCompoundInterest({
      initialAmount,
      months,
      rate,
      monthlyAmount,
      tax,
    });

    expect(result.interestTotalAmount.toFixed()).toEqual(
      (38757.3905).toFixed()
    );
    expect(result.taxRateTotalAmount.toFixed()).toEqual((6839.5395).toFixed());
  });
});
