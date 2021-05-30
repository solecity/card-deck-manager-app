// base
import React, { useState, useEffect } from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// custom components
import { Header } from "../../components";

// api
import { getUser, updateUser } from "../../services/user";

// hooks
import { useAuth } from "../../hooks/useAuth";

// styles
import useStyles from "./styles";

const Account = () => {
  const classes = useStyles();

  const { userId } = useAuth();

  const [data, setData] = useState({
    username: "",
    name: "",
    password: ""
  });

  const getData = async (id) => {
    const user = await getUser(id);

    if (user) {
      setData({
        username: user.username,
        name: user.name,
        password: user.password
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUser(userId, data);

    if (res) {
      // success
    }
  };

  useEffect(() => {
    console.log(userId);
    getData(userId);
  }, [userId]);

  return (
    <Container>
      <Header title="Account" />
      <Grid container justify="center">
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="username"
                type="text"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="password"
                type="password"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
                onChange={(e) => setData({ ...data, name: e.target.value })}
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
            Save
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default Account;
