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
    user: "",
    name: "",
    description: "",
    value: ""
  });
  const [users, setUsers] = useState([]);

  const id = location.state.id;

  const getData = async (id) => {
    const card = await getCard(id);

    if (card) {
      setData({
        user: card.user._id,
        name: card.name,
        description: card.description,
        value: card.value
      });
    }
  };

  const getUsers = () => {};

  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(() => {
    const getUsersSelect = async () => {
      const res = await getUsers();

      if (res) {
        setUsers(res);
      }
    };

    getUsersSelect();
  }, []);

  return (
    <Container>
      <Header back path={location.state.from} title="Edit card" />
      <Form id={id} data={data} setData={setData} users={users} />
    </Container>
  );
};

export default CardDetails;
