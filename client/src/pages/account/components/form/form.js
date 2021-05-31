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

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const showPassword = () => {
    setChangePassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
