// base
import React, { useState } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// custom components
import { SelectInput } from "../../../../../../../../components";

// api
import { createUser } from "../../../../../../../../services/user";

// styles
import useStyles from "./styles";

const Form = ({ getData, handleForm }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    username: "",
    name: "",
    password: "",
    type: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(data);

    if (res) {
      setData({ username: "", name: "", password: "", type: 0 });

      handleForm();

      getData();
    }
  };
  return (
    <form noValidate onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
      >
        Add
      </Button>
    </form>
  );
};

export default Form;
