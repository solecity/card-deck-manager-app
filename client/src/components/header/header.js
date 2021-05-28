// base
import React from "react";

// external components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = ({ title }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>{title}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
