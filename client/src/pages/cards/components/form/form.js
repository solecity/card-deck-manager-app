// base
import React, { useState } from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// api
import { createCard } from "../../../../services/card";

// styles
import useStyles from "./styles";

const Form = ({ getData }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    name: "",
    description: "",
    value: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createCard(data);

    if (res) {
      setData({ name: "", description: "", value: "" });

      getData();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Add card</Typography>
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
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              onChange={(e) => setData({ ...data, value: e.target.value })}
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
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
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
    </Container>
  );
};

export default Form;
