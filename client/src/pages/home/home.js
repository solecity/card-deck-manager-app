// base
import React from "react";

// external components
import { Grid } from "@material-ui/core";

// custom components
import { Login, Register } from "./components";

// styles
import useStyles from "./styles";

const Home = ({ isLogin }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      className={classes.form}
    >
      {isLogin ? <Login /> : <Register />}
    </Grid>
  );
};

export default Home;
