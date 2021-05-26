// base
import React from "react";

// external components
import { Grid } from "@material-ui/core";

// custom components
import { Form } from "./components";

// styles
import useStyles from "./styles";

const Login = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      className={classes.form}
    >
      <Form />
    </Grid>
  );
};

export default Login;
