// base
import React, { useState, useEffect } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let messages = { ...errors };

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

    if (data.user === 0) {
      messages = { ...messages, user: "User is required" };
    } else {
      messages = { ...messages, user: "" };
    }

    setErrors(messages);
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

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
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={Boolean(errors.user)}>
            <Select
              fullWidth
              variant="outlined"
              input={<SelectInput />}
              value={data.user}
              onChange={handleChange("user")}
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
            <FormHelperText>{errors.user}</FormHelperText>
          </FormControl>
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
