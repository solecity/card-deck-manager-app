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

const Card = () => {
  const classes = useStyles();

  return (
    <MUICard className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          name
        </Typography>
        <Typography variant="body2" component="p">
          description
        </Typography>
        <Typography variant="body2" component="p">
          value
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="primary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </MUICard>
  );
};

export default Card;
