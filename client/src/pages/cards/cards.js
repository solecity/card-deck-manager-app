// base
import React, { useState, useEffect } from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header } from "../../components";
import { Form, Card } from "./components";

// api
import { getUserCards } from "../../services/card";

// styles
import useStyles from "./styles";

const Cards = () => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);

  const getData = async () => {
    const res = await getUserCards();

    if (res) {
      setCards(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header title="Cards" />
      <Grid container justify="center">
        <Form getData={getData} />
        <Grid container spacing={2} className={classes.list}>
          {Boolean(cards.length) &&
            cards.map((card) => (
              <Grid item xs={3} key={card._id}>
                <Card card={card} getData={getData} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cards;
