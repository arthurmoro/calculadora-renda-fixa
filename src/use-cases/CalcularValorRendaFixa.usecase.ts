import {
  Calculator,
  ICalculateCompoundInterestDTO,
  ICalculateCompoundInterestResponse,
} from "../domain/entities/calculator/Calculator";

export class CalcularValorRendaFixa {
  constructor(private readonly calculator: Calculator) {}

  async execute(
    calculoRendaFixaParams: ICalculateCompoundInterestDTO
  ): Promise<ICalculateCompoundInterestResponse> {
    const calculatedValues = await this.calculator.calculateCompoundInterest(
      calculoRendaFixaParams as ICalculateCompoundInterestDTO
    );
    console.log(calculoRendaFixaParams);
    return calculatedValues;
  }
}
