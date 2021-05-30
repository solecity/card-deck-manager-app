// base
import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

// external components
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header } from "../../components";
import { Form, Cards } from "./components";

// api
import {
  getCollection,
  updateCollectionCards
} from "../../services/collection";
import { getCard, getUserCards } from "../../services/card";

// styles
import useStyles from "./styles";

const CollectionDetails = () => {
  const classes = useStyles();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState({ name: "" });
  const [collectionCards, setCollectionCards] = useState([]);
  const [remainingCards, setRemainingCards] = useState([]);

  const id = location.state.id;

  const getData = useCallback(async () => {
    setIsLoading(true);

    const collection = await getCollection(id);
    const allCards = await getUserCards();

    if (collection) {
      setCollectionInfo({ name: collection.name });
      setCollectionCards(collection.cards);

      if (allCards) {
        const cards = allCards.filter((r) => {
          for (const i in collection.cards) {
            if (collection.cards[i]._id === r._id) {
              return false;
            }
          }

          return true;
        });

        setRemainingCards(cards);
      }
    }

    setIsLoading(false);
  }, [id]);

  const addCard = async (cardId) => {
    const cards = remainingCards.filter((card) => card._id !== cardId);
    const card = await getCard(cardId);

    setRemainingCards(cards);
    setCollectionCards([...collectionCards, card]);
  };

  const removeCard = async (cardId) => {
    const cards = collectionCards.filter((card) => card._id !== cardId);
    const card = await getCard(cardId);

    setRemainingCards([...remainingCards, card]);
    setCollectionCards(cards);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    updateCollectionCards(id, collectionCards);
  }, [id, collectionCards]);

  return (
    <Container>
      <Header back path={location.state.from} title="Edit collection" />
      <Form id={id} data={collectionInfo} setData={setCollectionInfo} />
      {isLoading ? (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Cards
          title={collectionInfo.name}
          collectionCards={collectionCards}
          remainingCards={remainingCards}
          addCard={addCard}
          removeCard={removeCard}
        />
      )}
    </Container>
  );
};

export default CollectionDetails;
