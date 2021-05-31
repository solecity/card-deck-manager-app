// base
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// custom components
import { SelectInput } from "../../../../components";

// api
import { updateUser } from "../../../../services/user";

// styles
import useStyles from "./styles";

const Form = ({ loggedUser, id, data, setData }) => {
  const classes = useStyles();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUser(id, data);

    if (res) {
      history.push("/admin");
    }
  };

  return (
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
            disabled={loggedUser === id}
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
  );
};

export default Form;
