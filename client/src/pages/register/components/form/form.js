// base
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// external components
import { Grid, TextField, Typography, Button, Link } from "@material-ui/core";

// api
import { createUser } from "../../../../services/user";

//hooks
import { useAuth } from "../../../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    username: "",
    name: "",
    password: ""
  });

  const history = useHistory();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(data);

    if (res) {
      login({
        username: data.username,
        password: data.password
      });
    }
  };

  return (
    <Grid item xs={6}>
      <Typography className={classes.title} variant="h4">
        Register
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
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <TextField
          className={classes.input}
          required
          fullWidth
          variant="outlined"
          size="small"
          type="text"
          label="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          className={classes.input}
          required
          fullWidth
          variant="outlined"
          size="small"
          type="password"
          label="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
        <Link
          className={classes.link}
          href=""
          onClick={() => history.push("/login")}
        >
          Already a member?
        </Link>
      </form>
    </Grid>
  );
};

export default Form;
