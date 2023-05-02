export interface ICalcularRendaFixaDTO {
  initialAmount: number;
  months: number;
  rate: number;
  monthlyAmount?: number;
  tax?: number;
}
