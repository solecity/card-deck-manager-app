// base
import React, { useState, useEffect } from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header } from "../../components";
import { Form, Card } from "./components";

// api
import { getUserCollections } from "../../services/collection";

// styles
import useStyles from "./styles";

const Collections = () => {
  const classes = useStyles();

  const [collections, setCollections] = useState([]);

  const getData = async () => {
    const res = await getUserCollections();

    if (res) {
      setCollections(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header title="Collections" />
      <Grid container justify="center">
        <Form getData={getData} />
      </Grid>
      <Grid container spacing={2} className={classes.list}>
        {Boolean(collections.length) &&
          collections.map((collection) => (
            <Grid item xs={2} key={collection._id}>
              <Card collection={collection} getData={getData} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Collections;
