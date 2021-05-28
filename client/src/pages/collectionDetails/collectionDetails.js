// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// api
import { getCollection, updateCollection } from "../../services/collection";

// styles
import useStyles from "./styles";

const CollectionDetails = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [data, setData] = useState({ name: "" });

  const id = location.state.id;

  const getData = async (id) => {
    const collection = await getCollection(id);

    if (collection) {
      setData({ name: collection.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateCollection(id, data);

    if (res) {
      history.push("/collections");
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h6">Edit collection</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="name"
              type="text"
              variant="outlined"
              size="small"
              required
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default CollectionDetails;
