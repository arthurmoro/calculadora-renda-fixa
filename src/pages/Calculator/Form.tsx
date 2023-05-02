import { SyntheticEvent, useState } from "react";
import { CalculatorInputs } from ".";

interface CalculatorFormProps {
  calcular: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm(props: CalculatorFormProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>(
    {} as CalculatorInputs
  );

  const calcular = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.calcular(inputs);
  };

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <form onSubmit={calcular}>
      <div>
        <label htmlFor="valor">Valor inicial:</label>
        <input
          type="number"
          id="aporte_inicial"
          name="aporte_inicial"
          value={inputs.aporte_inicial}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="aporte_mensal">
          Qual a média de aporte mensal até a data final?
        </label>
        <input
          type="number"
          id="aporte_mensal"
          name="aporte_mensal"
          value={inputs.aporte_mensal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="taxa">Qual a taxa de juros mensal?</label>
        <input
          type="number"
          id="taxa_mes"
          name="taxa_mes"
          value={inputs.taxa_mes}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="periodo_em_meses">Qual o período em meses?</label>
        <input
          type="number"
          id="periodo_em_meses"
          name="periodo_em_meses"
          value={inputs.periodo_em_meses}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="taxa_imposto">
          No final do periodo, qual o imposto sobre rendimento?
        </label>
        <input
          type="number"
          id="taxa_imposto"
          name="taxa_imposto"
          value={inputs.taxa_imposto}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Calcular</button>
      </div>
    </form>
  );
}
