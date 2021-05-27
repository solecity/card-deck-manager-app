// base
import React, { useState, useEffect } from "react";

// external components
import { Grid, TextField, Typography, Button } from "@material-ui/core";

// custom components
import { Card } from "./components";

// api
import { getUserCards, createCard, deleteCard } from "../../services/card";

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

  const handleEdit = () => {
    /// edit card
  };

  const handleDelete = async (id) => {
    const res = await deleteCard(id);

    if (res) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [cards]);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4">Cards</Typography>
      </Grid>
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
          <Button fullWidth variant="contained" color="primary" type="submit">
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
