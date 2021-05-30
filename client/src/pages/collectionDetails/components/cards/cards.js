// base
import React from "react";

// external components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// custom components
import { ListItem } from "./components";

// styles
import useStyles from "./styles";

const Cards = ({
  title,
  collectionCards,
  remainingCards,
  addCard,
  removeCard
}) => {
  const classes = useStyles();

  return (
    <Grid container justify="space-between" className={classes.root}>
      <Grid item xs={6} className={classes.box}>
        <Typography variant="h6" className={classes.subtitle}>
          My Cards
        </Typography>
        {remainingCards.map((card) => (
          <ListItem key={card._id} card={card} add addCard={addCard} />
        ))}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" className={classes.subtitle}>
          {title}'s Cards
        </Typography>
        {Boolean(collectionCards) &&
          collectionCards.map((card) => (
            <ListItem key={card._id} card={card} removeCard={removeCard} />
          ))}
      </Grid>
    </Grid>
  );
};

export default Cards;
