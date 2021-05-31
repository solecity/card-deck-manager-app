// base
import React, { useState, useEffect } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// custom components
import { SelectInput } from "../../../../../../../../components";

// api
import { getUsers } from "../../../../../../../../services/user";
import { createCollection } from "../../../../../../../../services/collection";

// styles
import useStyles from "./styles";

const Form = ({ getData, handleForm }) => {
  const classes = useStyles();

  const [data, setData] = useState({ user: 0, name: "" });
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createCollection(data);

    if (res) {
      setData({ user: 0, name: "" });

      handleForm();

      getData();
    }
  };

  useEffect(() => {
    const getUsersSelect = async () => {
      const res = await getUsers();

      if (res) {
        setUsers(res);
      }
    };

    getUsersSelect();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
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
        <Grid item xs={12}>
          <Select
            fullWidth
            variant="outlined"
            input={<SelectInput />}
            value={data.user}
            onChange={(e) => setData({ ...data, user: e.target.value })}
          >
            <MenuItem value={0} disabled>
              user
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.username}
              </MenuItem>
            ))}
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
