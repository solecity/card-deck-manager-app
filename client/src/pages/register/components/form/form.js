// base
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

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
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const { login } = useAuth();

  const validateForm = () => {
    let messages = { ...errors };

    if (data.username === "") {
      messages = { ...messages, username: "Username is required" };
    } else if (data.username.length < 4 || data.username.length > 30) {
      messages = {
        ...messages,
        username: "Username has to have between 4 and 30 characters"
      };
    } else {
      messages = { ...messages, username: "" };
    }

    if (data.name === "") {
      messages = { ...messages, name: "Name is required." };
    } else if (data.name.length > 30) {
      messages = {
        ...messages,
        name: "Name cannot have more than 30 characters"
      };
    } else {
      messages = { ...messages, name: "" };
    }

    if (data.password === "") {
      messages = { ...messages, password: "Password is required." };
    } else if (data.password.length < 4 || data.password.length > 30) {
      messages = {
        ...messages,
        password: "Password has to have between 4 and 30 characters"
      };
    } else {
      messages = { ...messages, password: "" };
    }

    setErrors(messages);
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

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
      <form noValidate onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              required
              fullWidth
              variant="outlined"
              size="small"
              type="text"
              label="username"
              value={data.username}
              onChange={handleChange("username")}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              required
              fullWidth
              variant="outlined"
              size="small"
              type="text"
              label="name"
              value={data.name}
              onChange={handleChange("name")}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              required
              fullWidth
              variant="outlined"
              size="small"
              type="password"
              label="password"
              value={data.password}
              onChange={handleChange("password")}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
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
