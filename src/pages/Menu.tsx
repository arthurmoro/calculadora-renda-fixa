import { Container, Navbar } from "react-bootstrap";

export function Menu() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#">Calculadora de renda fixa</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
