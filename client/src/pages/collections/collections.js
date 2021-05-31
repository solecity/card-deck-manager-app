// base
import React, { useState, useEffect, useCallback } from "react";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header, Toolbar, Modal } from "../../components";
import { Form, Card } from "./components";

// api
import { getUserCollections } from "../../services/collection";

// styles
import useStyles from "./styles";

const Collections = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);

    const res = await getUserCollections();

    if (res) {
      setCollections(res);
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleForm = () => {
    setOpenForm(!openForm);
  };

  const handleSearchResult = (value) => {
    if (search === "") return value;
    else if (value.name.toLowerCase().includes(search.toLowerCase()))
      return value;

    return false;
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <Header title="Collections" />
      <Toolbar
        search={search}
        handleSearch={handleSearch}
        handleForm={handleForm}
      />
      <Modal open={openForm} handleClose={handleForm} title="Add collection">
        <Form getData={getData} handleForm={handleForm} />
      </Modal>
      <Grid container spacing={2} className={classes.list}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          Boolean(collections.length) &&
          collections
            .filter((collection) => handleSearchResult(collection))
            .map((collection) => (
              <Grid item xs={3} key={collection._id}>
                <Card collection={collection} getData={getData} />
              </Grid>
            ))
        )}
      </Grid>
    </Container>
  );
};

export default Collections;
