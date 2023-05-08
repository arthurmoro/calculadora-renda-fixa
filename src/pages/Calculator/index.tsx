import React from "react";
import { CalculatorController } from "../../controllers/Calculator.controller";
import { CalculatorForm } from "./Form";
import { ICalculateCompoundInterestResponse } from "../../domain/entities/calculator/Calculator";
import { CalculatorResultsPresenter } from "./Results";
import { Col, Row } from "react-bootstrap";

export interface CalculatorInputs {
  aporte_inicial: number;
  aporte_mensal: number;
  taxa_mes: number;
  periodo_em_meses: number;
  taxa_imposto: number;
}

export interface CalculatedResults extends CalculatorInputs {
  valor_total_investido: number;
  valor_total_juros: number;
  valor_total_imposto: number;
  valor_total_liquido: number;
  valor_total_sem_imposto: number;
}

export function Calculator() {
  const [resultadoCalculo, setResultadoCalculo] =
    React.useState<CalculatedResults>({
      aporte_inicial: 0,
      aporte_mensal: 0,
      periodo_em_meses: 0,
      taxa_mes: 0,
      taxa_imposto: 0,
      valor_total_investido: 0,
      valor_total_juros: 0,
      valor_total_imposto: 0,
      valor_total_liquido: 0,
      valor_total_sem_imposto: 0,
    });

  async function calcular(inputs: CalculatorInputs) {
    const aporte_inicial = inputs.aporte_inicial;
    const aporte_mensal = inputs.aporte_mensal;
    const taxa_mes = inputs.taxa_mes;
    const periodo_em_meses = inputs.periodo_em_meses;
    const taxa_imposto = inputs.taxa_imposto;
    const calculatorController = new CalculatorController();
    const resultado = await calculatorController.executar({
      initialAmount: aporte_inicial,
      months: periodo_em_meses,
      rate: taxa_mes,
      monthlyAmount: aporte_mensal,
      tax: taxa_imposto,
    });
    resultadoCalculo.aporte_inicial = aporte_inicial;
    getCalculatedResultsDTO(resultado);
    console.log(resultado);
  }

  function getCalculatedResultsDTO(
    resutlado: ICalculateCompoundInterestResponse
  ): void {
    setResultadoCalculo({
      aporte_inicial: resutlado.initialAmount,
      aporte_mensal: resutlado.monthlyAmount,
      periodo_em_meses: resutlado.months,
      taxa_mes: resutlado.monthlyInterest,
      taxa_imposto: resutlado.monthlyInterest,
      valor_total_investido: resutlado.totalAmount,
      valor_total_juros: resutlado.interestTotalAmount,
      valor_total_imposto: resutlado.taxRateTotalAmount,
      valor_total_sem_imposto: resutlado.totalAmountWithInterests,
      valor_total_liquido: resutlado.totalAmountWithInterestsAndTaxes,
    });
  }

  return (
    <Row>
      <Col sm={12} md={6} style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <CalculatorForm calcular={calcular} />
      </Col>
      <Col sm={12} md={6} style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <CalculatorResultsPresenter {...resultadoCalculo} />
      </Col>
    </Row>
  );
}
