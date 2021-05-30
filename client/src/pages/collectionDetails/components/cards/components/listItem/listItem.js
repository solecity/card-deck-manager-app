// base
import React from "react";

// external components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { BiDiamond, BiPlusCircle, BiMinusCircle } from "react-icons/bi";

// styles
import useStyles from "./styles";

const ListItem = ({ card, add, addCard, removeCard }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <CardContent className={classes.content}>
            <Typography noWrap variant="h6">
              {card.name}
            </Typography>
            <Grid container>
              <BiDiamond className={classes.diamond} />
              <Typography variant="body2" color="textSecondary">
                {card.value}
              </Typography>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item xs={2}>
          <CardActions className={classes.buttons}>
            {add ? (
              <IconButton size="medium" onClick={() => addCard(card._id)}>
                <BiPlusCircle />
              </IconButton>
            ) : (
              <IconButton size="medium" onClick={() => removeCard(card._id)}>
                <BiMinusCircle />
              </IconButton>
            )}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ListItem;
