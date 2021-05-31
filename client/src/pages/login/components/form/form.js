// base
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

// hooks
import { useAuth } from "../../../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();

  const [data, setData] = useState({ username: "", password: "" });
  const [sendMessage, setSendMessage] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const history = useHistory();

  const validateForm = () => {
    let messages = { ...errors };

    messages =
      data.username === ""
        ? { ...messages, username: "Username is required" }
        : { ...messages, username: "" };

    messages =
      data.password === ""
        ? { ...messages, password: "Password is required" }
        : { ...messages, password: "" };

    setErrors(messages);
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

    login(data);
  };

  return (
    <Grid item xs={6}>
      <Typography variant="h4">Login</Typography>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        {sendMessage && (
          <Typography variant="subtitle2" className={classes.message}>
            {generalError}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Form;
