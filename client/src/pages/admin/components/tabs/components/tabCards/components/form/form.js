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
import { createCard } from "../../../../../../../../services/card";

// styles
import useStyles from "./styles";

const Form = ({ getData, handleForm }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    user: 0,
    name: "",
    description: "",
    value: ""
  });
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let messages = { ...errors };

    if (data.name === "") {
      messages = { ...messages, name: "Name is required" };
    } else if (data.name.length > 30) {
      messages = {
        ...messages,
        name: "Name cannot have more than 30 characters"
      };
    } else {
      messages = { ...messages, name: "" };
    }

    if (data.description === "") {
      messages = { ...messages, description: "Description is required" };
    } else {
      messages = { ...messages, description: "" };
    }

    if (data.value === "") {
      messages = { ...messages, value: "Value is required" };
    } else if (data.value <= 0) {
      messages = {
        ...messages,
        value: "Value has to be a positive number"
      };
    } else {
      messages = { ...messages, value: "" };
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

    const res = await createCard(data);

    if (res) {
      setData({ user: 0, name: "", description: "", value: "" });

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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            label="value"
            type="number"
            variant="outlined"
            size="small"
            required
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
            value={data.value}
            onChange={handleChange("value")}
            error={Boolean(errors.value)}
            helperText={errors.value}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="description"
            variant="outlined"
            size="small"
            required
            fullWidth
            multiline
            rows={4}
            value={data.description}
            onChange={handleChange("description")}
            error={Boolean(errors.description)}
            helperText={errors.description}
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
