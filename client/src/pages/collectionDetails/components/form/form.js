// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// api
import { updateCollection } from "../../../../services/collection";

// styles
import useStyles from "./styles";

const Form = ({ id, data, setData }) => {
  const classes = useStyles();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateCollection(id, data);

    if (res) {
      history.push("/collections");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
