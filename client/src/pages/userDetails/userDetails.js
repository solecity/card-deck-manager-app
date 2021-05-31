// base
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// external components
import Container from "@material-ui/core/Container";

// custom components
import { Header } from "../../components";
import { Form } from "./components";

// api
import { getUser } from "../../services/user";

// hooks
import { useAuth } from "../../hooks/useAuth";

const UserDetails = () => {
  const { userId } = useAuth();

  const location = useLocation();

  const [data, setData] = useState({
    username: "",
    name: "",
    type: ""
  });

  const id = location.state.id;

  const getData = async (id) => {
    const user = await getUser(id);

    if (user) {
      setData({
        username: user.username,
        name: user.name,
        type: user.type
      });
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Container>
      <Header back path={location.state.from} title="Edit user" />
      <Form loggedUser={userId} id={id} data={data} setData={setData} />
    </Container>
  );
};

export default UserDetails;
