// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// styles
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h4">Welcome</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/login")}
        >
          Enter
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
