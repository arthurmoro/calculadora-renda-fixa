import { CalculatedResults } from ".";

export interface CalculaRendaFixaResultProps {
  result: CalculatedResults;
}

export function CalculatorResultsPresenter(props: CalculatedResults) {
  return (
    <div>
      <p>Resultados:</p>
      <p>Valor investido: R$ {props.valor_total_investido.toFixed(2)}</p>
      <p>
        Valor recebido de juros compostos: R${" "}
        {props.valor_total_juros.toFixed(2)}
      </p>
      <p>
        Valor investido + juros: R$ {props.valor_total_sem_imposto.toFixed(2)}
      </p>
      <p>
        Valor a ser cobrado de imposto: R${" "}
        {props.valor_total_imposto.toFixed(2)}
      </p>
      <p>
        Valor líquido estimado após periodo de investimento: R${" "}
        {props.valor_total_liquido.toFixed(2)}
      </p>
    </div>
  );
}
