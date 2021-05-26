// base
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// external components
import { Grid, TextField, Typography, Button, Link } from "@material-ui/core";

// api
import { create } from "../../../../services/user";

//hooks
import { useAuth } from "../../../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();

  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    password: ""
  });

  const history = useHistory();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await create(registerData);

    if (res) {
      login({
        username: registerData.username,
        password: registerData.password
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
          value={registerData.username}
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
        />
        <TextField
          className={classes.input}
          required
          fullWidth
          variant="outlined"
          size="small"
          type="text"
          label="name"
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
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
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
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
