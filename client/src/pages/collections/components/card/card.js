// base
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

// custom components
import { ConfirmDelete } from "../../../../components";

// api
import { deleteCollection } from "../../../../services/collection";

// styles
import useStyles from "./styles";

const CardComp = ({ collection, getData }) => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirm = async () => {
    setOpenConfirm(!openConfirm);
  };

  const handleEdit = async (id) => {
    history.push({
      pathname: "./collectionDetails",
      state: { id, from: location.pathname }
    });
  };

  const handleDelete = async (id) => {
    const res = await deleteCollection(id);

    if (res) {
      setOpenConfirm(!openConfirm);
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
      <ConfirmDelete
        open={openConfirm}
        handleClose={handleConfirm}
        handleDelete={() => handleDelete(collection._id)}
        item="collection"
        name={collection.name}
      />
    </Card>
  );
};

export default CardComp;
