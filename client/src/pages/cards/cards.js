// base
import React, { useState, useEffect, useCallback } from "react";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header, Toolbar, Modal, NoData } from "../../components";
import { Form, Card } from "./components";

// api
import { getUserCards } from "../../services/card";

// hooks
import { useAuth } from "../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Cards = () => {
  const classes = useStyles();

  const { userId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);

    if (userId) {
      const res = await getUserCards(userId);

      if (res) {
        setCards(res);
        setIsLoading(false);
      }
    }
  }, [userId]);

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
      <Header title="Cards" />
      <Toolbar
        search={search}
        handleSearch={handleSearch}
        handleForm={handleForm}
      />
      <Modal open={openForm} handleClose={handleForm} title="Add card">
        <Form getData={getData} handleForm={handleForm} />
      </Modal>
      <Grid container spacing={2} className={classes.list}>
        {isLoading ? (
          <Grid container justify="center" className={classes.loading}>
            <CircularProgress />
          </Grid>
        ) : Boolean(cards.length) ? (
          cards
            .filter((card) => handleSearchResult(card))
            .map((card) => (
              <Grid item xs={3} key={card._id}>
                <Card card={card} getData={getData} />
              </Grid>
            ))
        ) : (
          <NoData item="card" />
        )}
      </Grid>
    </Container>
  );
};

export default Cards;
