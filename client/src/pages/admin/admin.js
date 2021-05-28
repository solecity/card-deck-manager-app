// base
import React from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// custom components
import { Header } from "../../components";
import { Tabs } from "./components";

const Admin = () => {
  return (
    <Container>
      <Header title="Admin Panel" />
      <Grid container justify="center">
        <Tabs />
      </Grid>
    </Container>
  );
};

export default Admin;
