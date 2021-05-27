// base
import React from "react";

// external components
import {
  Card as MUICard,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

// styles
import useStyles from "./styles";

const Card = ({ card, handleEdit, handleDelete }) => {
  const classes = useStyles();

  return (
    <MUICard className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="body2" component="p">
          {card.description}
        </Typography>
        <Typography variant="body2" component="p">
          {card.value}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={() => handleEdit(card._id)}>
          <EditIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => handleDelete(card._id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </MUICard>
  );
};

export default Card;
