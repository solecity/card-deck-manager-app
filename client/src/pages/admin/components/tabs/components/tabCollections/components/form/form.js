// base
import React, { useState, useEffect } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// custom components
import { SelectInput } from "../../../../../../../../components";

// api
import { getUsers } from "../../../../../../../../services/user";
import { createCollection } from "../../../../../../../../services/collection";

// styles
import useStyles from "./styles";

const Form = ({ getData }) => {
  const classes = useStyles();

  const [data, setData] = useState({ user: "", name: "" });
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createCollection(data);

    if (res) {
      setData({ user: "", name: "" });

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
    <Grid item xs={8}>
      <Typography variant="h6">Add collection</Typography>
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
              native
              fullWidth
              variant="outlined"
              input={<SelectInput />}
              value={data.user}
              onChange={(e) => setData({ ...data, user: e.target.value })}
            >
              <option value="" disabled>
                user
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
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
    </Grid>
  );
};

export default Form;
