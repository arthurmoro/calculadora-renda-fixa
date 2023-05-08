import { ReactNode, SyntheticEvent, useCallback, useState } from "react";
import { CalculatorInputs } from ".";
import { Button, Card, Form } from "react-bootstrap";
import CurrencyInput, {
  onValueChangeProps,
} from "../../components/Form/CurrencyInput";
interface CalculatorFormProps {
  calcular: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm(props: CalculatorFormProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    aporte_inicial: 0,
    aporte_mensal: 0,
    taxa_mes: 0,
    periodo_em_meses: 0,
    taxa_imposto: 0,
  } as CalculatorInputs);

  const calcular = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.calcular({
      ...inputs,
      aporte_inicial: inputs.aporte_inicial / 100,
      aporte_mensal: inputs.aporte_mensal / 100,
      taxa_mes: inputs.taxa_mes / 100,
      taxa_imposto: inputs.taxa_imposto / 100,
    });
  };

  const handleChange = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleValueChange = useCallback((val: onValueChangeProps) => {
    setInputs((values) => ({ ...values, [val.name]: val.value }));
  }, []);

  return (
    <Card body>
      <Form onSubmit={calcular}>
        <Form.Group className="mb-3">
          <Form.Label column>Valor inicial:</Form.Label>
          <CurrencyInput
            name="aporte_inicial"
            max={10000000000000}
            value={inputs.aporte_inicial}
            onValueChange={handleValueChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column>
            Qual a média de aporte mensal até a data final?
          </Form.Label>
          <CurrencyInput
            name="aporte_mensal"
            max={10000000000000}
            value={inputs.aporte_mensal}
            onValueChange={handleValueChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column>Qual a taxa de juros mensal?</Form.Label>

          <CurrencyInput
            max={10000}
            name="taxa_mes"
            display="decimal"
            value={inputs.taxa_mes}
            onValueChange={handleValueChange}
            prefix="% "
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column>Qual o período em meses?</Form.Label>

          <Form.Control
            type="number"
            id="periodo_em_meses"
            name="periodo_em_meses"
            value={inputs.periodo_em_meses}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column>
            No final do periodo, qual o imposto sobre rendimento?
          </Form.Label>

          <CurrencyInput
            max={10000}
            name="taxa_imposto"
            display="decimal"
            value={inputs.taxa_imposto}
            onValueChange={handleValueChange}
            prefix="% "
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Calcular
        </Button>
      </Form>
    </Card>
  );
}
