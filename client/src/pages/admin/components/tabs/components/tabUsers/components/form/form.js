// base
import React, { useState } from "react";

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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let messages = { ...errors };

    if (data.username === "") {
      messages = { ...messages, username: "Username is required" };
    } else if (data.username.length < 4 || data.username.length > 30) {
      messages = {
        ...messages,
        username: "Username has to have between 4 and 30 characters"
      };
    } else {
      messages = { ...messages, username: "" };
    }

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

    if (data.password === "") {
      messages = { ...messages, password: "Password is required" };
    } else if (data.password.length < 4 || data.password.length > 30) {
      messages = {
        ...messages,
        password: "Password has to have between 4 and 30 characters"
      };
    } else {
      messages = { ...messages, password: "" };
    }

    if (data.type === 0) {
      messages = { ...messages, type: "Type is required" };
    } else {
      messages = { ...messages, type: "" };
    }

    setErrors(messages);
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

    const res = await createUser(data);

    if (!res.status) {
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
            onChange={handleChange("username")}
            error={Boolean(errors.username)}
            helperText={errors.username}
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
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
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
            onChange={handleChange("password")}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(errors.type)}>
            <Select
              fullWidth
              variant="outlined"
              input={<SelectInput />}
              value={data.type}
              onChange={handleChange("type")}
            >
              <MenuItem value={0} disabled>
                type
              </MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Standard</MenuItem>
            </Select>
            <FormHelperText>{errors.type}</FormHelperText>
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
