// base
import React from "react";

// external components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

// styles
import useStyles from "./styles";

const CardComp = ({ card, handleEdit, handleDelete }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text>{card.description}</Card.Text>
        <Card.Text>{card.value}</Card.Text>
        <Button
          className={classes.edit}
          variant="light"
          onClick={() => handleEdit(card._id)}
        >
          <BiEditAlt />
        </Button>
        <Button
          className={classes.delete}
          variant="light"
          onClick={() => handleDelete(card._id)}
        >
          <BiTrashAlt />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardComp;
