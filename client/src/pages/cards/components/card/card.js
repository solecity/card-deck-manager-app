// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { BiDiamond, BiEditAlt, BiTrashAlt } from "react-icons/bi";

// api
import { deleteCard } from "../../../../services/card";

// styles
import useStyles from "./styles";

const CardComp = ({ card, getData }) => {
  const classes = useStyles();

  const history = useHistory();

  const handleEdit = async (id) => {
    history.push({ pathname: "./cardDetails", state: { id } });
  };

  const handleDelete = async (id) => {
    const res = await deleteCard(id);

    if (res) {
      getData();
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography noWrap gutterBottom variant="h5">
          {card.name}
        </Typography>
        <Box my={2} overflow="auto" className={classes.box}>
          <Typography variant="body2" color="textSecondary">
            {card.description}
          </Typography>
        </Box>
        <Grid container>
          <BiDiamond className={classes.diamond} />
          <Typography variant="body2" color="textSecondary">
            {card.value}
          </Typography>
        </Grid>
      </CardContent>
      <CardActions className={classes.buttons}>
        <IconButton size="small" onClick={() => handleEdit(card._id)}>
          <BiEditAlt />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete(card._id)}>
          <BiTrashAlt />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardComp;
