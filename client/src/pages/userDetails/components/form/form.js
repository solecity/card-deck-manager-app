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
            onChange={handleChange("username")}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            disabled={loggedUser === id}
            fullWidth
            variant="outlined"
            input={<SelectInput />}
            value={data.type}
            onChange={handleChange("type")}
            error={Boolean(errors.type)}
            helperText={errors.type}
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
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
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
