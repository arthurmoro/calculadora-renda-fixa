import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Menu } from "./Menu";
import { Calculator } from "./Calculator";
import TagManager from "react-gtm-module";

function App() {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-9N6XEJ9B9M" });
  });
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
