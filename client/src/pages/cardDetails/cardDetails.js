// base
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// external components
import Container from "@material-ui/core/Container";

// custom components
import { Header } from "../../components";
import { Form } from "./components";

// api
import { getCard } from "../../services/card";

const CardDetails = () => {
  const location = useLocation();

  const [data, setData] = useState({
    name: "",
    description: "",
    value: ""
  });

  const id = location.state.id;

  const getData = async (id) => {
    const card = await getCard(id);

    if (card) {
      setData({
        name: card.name,
        description: card.description,
        value: card.value
      });
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Container>
      <Header back path={location.state.from} title="Edit card" />
      <Form id={id} data={data} setData={setData} />
    </Container>
  );
};

export default CardDetails;
