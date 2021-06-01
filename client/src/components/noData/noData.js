// base
import React from "react";

// external components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MdContentPaste } from "react-icons/md";

// styles
import useStyles from "./styles";

const NoData = ({ isTable, item }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <MdContentPaste className={classes.icon} />
      </Grid>
      <Grid item>
        {isTable ? (
          <Typography variant="h4">There are no {item}.</Typography>
        ) : (
          <Typography variant="h4">Your {item} list is empty.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default NoData;
