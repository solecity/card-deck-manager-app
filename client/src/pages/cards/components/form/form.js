// base
import React, { useState } from "react";

// api
import { createCard } from "../../../../services/card";

// external components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// styles
import useStyles from "./styles";

const CardForm = ({ handleSubmit, data, setData }) => {
  const classes = useStyles();

  return (
    <Container fluid className={classes.root}>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="number"
                defaultValue={data.value}
                onChange={(e) => setData({ ...data, value: e.target.value })}
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default CardForm;
