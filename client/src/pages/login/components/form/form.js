// base
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// external components
import { Grid, TextField, Typography, Button, Link } from "@material-ui/core";

// hooks
import { useAuth } from "../../../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const { login } = useAuth();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(loginData);
  };

  return (
    <Grid item xs={6}>
      <Typography className={classes.title} variant="h4">
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          required
          fullWidth
          variant="outlined"
          size="small"
          type="text"
          label="username"
          value={loginData.username}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <TextField
          className={classes.input}
          required
          fullWidth
          variant="outlined"
          size="small"
          type="password"
          label="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
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

export default Form;
