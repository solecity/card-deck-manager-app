// base
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// custom components
import { Header } from "../../components";
import { SelectInput } from "../../components";

// api
import { getUser, updateUser } from "../../services/user";

// styles
import useStyles from "./styles";

const UserDetails = () => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const [data, setData] = useState({
    username: "",
    name: "",
    type: ""
  });

  const id = location.state.id;

  const getData = async (id) => {
    const user = await getUser(id);

    if (user) {
      setData({
        username: user.username,
        name: user.name,
        type: user.type
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUser(id, data);

    if (res) {
      history.push("/admin");
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Container>
      <Header back path={location.state.from} title="Edit user" />
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
            <Select
              fullWidth
              variant="outlined"
              input={<SelectInput />}
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <MenuItem value={0} disabled>
                type
              </MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Standard</MenuItem>
            </Select>
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
    </Container>
  );
};

export default UserDetails;
