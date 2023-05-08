import { Card, Col, Row } from "react-bootstrap";
import { CalculatedResults } from ".";

export interface CalculaRendaFixaResultProps {
  result: CalculatedResults;
}

export function CalculatorResultsPresenter(props: CalculatedResults) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <h2>Resultados</h2>
            </Col>
          </Row>
        </Card.Title>
        <p>
          Valor investido:{" "}
          {props.valor_total_investido.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>
          Valor recebido de juros compostos:{" "}
          {props.valor_total_juros.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>
          Valor investido + juros:{" "}
          {props.valor_total_sem_imposto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>
          Valor a ser cobrado de imposto:{" "}
          {props.valor_total_imposto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p>
          Valor líquido estimado após periodo de investimento:{" "}
          {props.valor_total_liquido.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </Card.Body>
    </Card>
  );
}
