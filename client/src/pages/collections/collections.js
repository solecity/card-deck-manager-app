// base
import React, { useState, useEffect } from "react";

// external components
import { Grid, TextField, Typography, Button } from "@material-ui/core";

// custom components
import { Card } from "./components";

// api
import {
  getUserCollections,
  createCollection,
  deleteCollection
} from "../../services/collection";

// styles
import useStyles from "./styles";

const Collections = () => {
  const classes = useStyles();

  const [data, setData] = useState({ name: "" });
  const [collections, setCollections] = useState([]);

  const getData = async () => {
    const res = await getUserCollections();

    if (res) {
      setCollections(res);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createCollection(data);

    if (res) {
      setData({ name: "" });

      getData();
    }
  };

  const handleEdit = () => {
    /// edit collection
  };

  const handleDelete = async (id) => {
    const res = await deleteCollection(id);

    if (res) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4">Collections</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">Add collection</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            required
            variant="outlined"
            size="small"
            type="text"
            label="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </Grid>
      <Grid container item spacing={2} xs={8} className={classes.list}>
        {Boolean(collections.length) &&
          collections.map((collection) => (
            <Grid item xs={4} key={collection._id}>
              <Card
                collection={collection}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Collections;
