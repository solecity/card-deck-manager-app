// base
import React, { useState } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

// api
import { updateUser } from "../../../../services/user";

// styles
import useStyles from "./styles";

const Form = ({ id, data, setData }) => {
  const classes = useStyles();

  const [changePassword, setChangePassword] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const [errors, setErrors] = useState({});

  const showPassword = () => {
    setChangePassword(true);
  };

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

    if (
      Boolean(data.password) &&
      (data.password.length < 4 || data.password.length > 30)
    ) {
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

    const res = await updateUser(id, data);

    if (res) {
      setSendMessage(true);
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="username"
                type="text"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={data.username}
                onChange={handleChange("username")}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="name"
                type="text"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={data.name}
                onChange={handleChange("name")}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              {changePassword ? (
                <TextField
                  label="password"
                  type="password"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  onChange={handleChange("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              ) : (
                <Link className={classes.link} href="#" onClick={showPassword}>
                  Change password
                </Link>
              )}
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Save
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        {sendMessage && (
          <Typography variant="subtitle2" className={classes.message}>
            Data edited successfully
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Form;
