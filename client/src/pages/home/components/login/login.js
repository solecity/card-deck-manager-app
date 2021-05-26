// base
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// external components
import { Grid, TextField, Typography, Button, Link } from "@material-ui/core";

// styles
import useStyles from "./styles";

const Login = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid item xs={6}>
      <Typography className={classes.title} variant="h4">
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          size="small"
          type="text"
          label="username"
        />
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          size="small"
          type="password"
          label="password"
        />
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>

        <Link
          className={classes.link}
          href=""
          onClick={() => history.push("/register")}
        >
          Don't have an account?
        </Link>
      </form>
    </Grid>
  );
};

export default Login;
