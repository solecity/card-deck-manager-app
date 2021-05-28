// base
import React, { useState, useEffect } from "react";

// external components
import { Grid, TextField, Typography } from "@material-ui/core";
import Button from "react-bootstrap/Button";

// custom components
import { Header } from "../../components";
import { Card } from "./components";

// api
import {
  getUserCards,
  getCard,
  createCard,
  updateCard,
  deleteCard
} from "../../services/card";

// styles
import useStyles from "./styles";

const Cards = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    name: "",
    description: "",
    value: ""
  });
  const [cards, setCards] = useState([]);

  const getData = async () => {
    const res = await getUserCards();

    if (res) {
      setCards(res);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createCard(data);

    if (res) {
      setData({ name: "", description: "", value: "" });

      getData();
    }
  };

  const handleEdit = async (id) => {
    const card = await getCard(id, data);

    if (card) {
      setData({
        name: card.name,
        description: card.description,
        value: card.value
      });
    }

    const res = await updateCard(id, data);

    if (res) {
      setData({ name: "", description: "", value: "" });

      getData();
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteCard(id);

    if (res) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justify="center" className={classes.root}>
      <Header title="Cards" />
      <Grid item xs={8}>
        <Typography variant="h6">Add card</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            variant="outlined"
            size="small"
            type="text"
            label="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            size="small"
            type="text"
            label="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            size="small"
            type="number"
            label="value"
            InputProps={{ inputProps: { min: 0 } }}
            value={data.value}
            onChange={(e) => setData({ ...data, value: e.target.value })}
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
      </Grid>
      <Grid container item spacing={2} xs={8} className={classes.list}>
        {Boolean(cards.length) &&
          cards.map((card) => (
            <Grid item xs={4} key={card._id}>
              <Card
                card={card}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Cards;
