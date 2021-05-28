// base
import React, { useState } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// api
import { createUser } from "../../../../../../../../services/user";

// styles
import useStyles from "./styles";

const Form = ({ getData }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    username: "",
    name: "",
    password: "",
    type: 2
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(data);

    if (res) {
      setData({ username: "", name: "", password: "", type: 2 });

      getData();
    }
  };

  return (
    <Grid item xs={8}>
      <Typography variant="h6">Add user</Typography>
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
        <Select
          native
          fullWidth
          variant="outlined"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        >
          <option value={1}>Admin</option>
          <option value={2}>Standard</option>
        </Select>
        <Button fullWidth variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </Grid>
  );
};

export default Form;
