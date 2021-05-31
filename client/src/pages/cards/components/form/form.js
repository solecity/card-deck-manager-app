// base
import React, { useState } from "react";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// api
import { createCard } from "../../../../services/card";

// styles
import useStyles from "./styles";

const Form = ({ getData, handleForm }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    name: "",
    description: "",
    value: ""
  });
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

    if (data.description === "") {
      messages = { ...messages, description: "Description is required" };
    } else {
      messages = { ...messages, description: "" };
    }

    if (data.value === "") {
      messages = { ...messages, value: "Value is required." };
    } else if (data.value <= 0) {
      messages = {
        ...messages,
        value: "Value has to be a positive number"
      };
    } else {
      messages = { ...messages, value: "" };
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
      setData({ name: "", description: "", value: "" });

      handleForm();

      getData();
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
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
