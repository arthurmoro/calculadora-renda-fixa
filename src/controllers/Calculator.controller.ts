import {
  Calculator,
  ICalculateCompoundInterestDTO,
} from "../domain/entities/calculator/Calculator";
import { CalcularValorRendaFixa } from "../use-cases/CalcularValorRendaFixa.usecase";

export class CalculatorController {
  calcularValorRendaFixaUseCase: CalcularValorRendaFixa;

  constructor() {
    this.calcularValorRendaFixaUseCase = new CalcularValorRendaFixa(
      new Calculator()
    );
  }

  async executar(props: ICalculateCompoundInterestDTO) {
    const result = await this.calcularValorRendaFixaUseCase.execute({
      initialAmount: +props.initialAmount,
      months: +props.months,
      rate: +props.rate,
      monthlyAmount: (props.monthlyAmount && +props.monthlyAmount) ?? 0,
      tax: (props.tax && +props.tax) ?? 0,
    });
    return result;
  }
}
