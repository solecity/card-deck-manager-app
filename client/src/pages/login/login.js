// base
import React from "react";

// external components
import Grid from "@material-ui/core/Grid";

// custom components
import { Form } from "./components";

// styles
import useStyles from "./styles";

const Login = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Form />
    </Grid>
  );
};

export default Login;
