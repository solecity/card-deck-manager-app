// base
import React, { useState } from "react";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// api
import { createCollection } from "../../../../services/collection";

// styles
import useStyles from "./styles";

const Form = ({ getData }) => {
  const classes = useStyles();

  const [data, setData] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createCollection(data);

    if (res) {
      setData({ name: "" });

      getData();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Add collection</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container>
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
          Add
        </Button>
      </form>
    </Container>
  );
};

export default Form;
