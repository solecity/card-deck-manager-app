// base
import React from "react";

// external components
import { Grid, TextField, Typography, IconButton } from "@material-ui/core";
import { AddBox as AddBoxIcon } from "@material-ui/icons";

// custom components
import { Card } from "./components";

// styles
import useStyles from "./styles";

const Collections = () => {
  const classes = useStyles();

  const handleSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4">Collections</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">Add collection</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField variant="outlined" size="small" type="text" label="name" />
          <IconButton color="primary">
            <AddBoxIcon />
          </IconButton>
        </form>
      </Grid>
      <Grid item xs={8} className={classes.list}>
        <Card />
      </Grid>
    </Grid>
  );
};

export default Collections;
