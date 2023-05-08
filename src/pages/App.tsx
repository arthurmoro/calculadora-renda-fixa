import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Menu } from "./Menu";
import { Calculator } from "./Calculator";

function App() {
  return (
    <>
      <Menu />
      <Container style={{ paddingTop: "16px" }}>
        <Row>
          <Col>
            <h2>
              Bem vind@s à calculadora de renda fixa mais simples da internet
            </h2>
          </Col>
        </Row>

        <Calculator />
      </Container>
    </>
  );
}

export default App;
