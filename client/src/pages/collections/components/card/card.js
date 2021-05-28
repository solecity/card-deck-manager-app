// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

// api
import { deleteCollection } from "../../../../services/collection";

// styles
import useStyles from "./styles";

const CardComp = ({ collection, getData }) => {
  const classes = useStyles();

  const history = useHistory();

  const handleEdit = async (id) => {
    history.push({ pathname: "./collectionDetails", state: { id } });
  };

  const handleDelete = async (id) => {
    const res = await deleteCollection(id);

    if (res) {
      getData();
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="h2">
          {collection.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Cards: {collection.cards.length}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttons}>
        <IconButton size="small" onClick={() => handleEdit(collection._id)}>
          <BiEditAlt />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete(collection._id)}>
          <BiTrashAlt />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardComp;
