// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { BiCaretLeft } from "react-icons/bi";

// styles
import useStyles from "./styles.js";

const Header = ({ back, path, title }) => {
  const classes = useStyles();

  const history = useHistory();

  const goBack = () => {
    history.push(path);
  };

  return (
    <Container className={classes.root}>
      <Grid container alignItems="center">
        {back && (
          <IconButton className={classes.button} onClick={goBack}>
            <BiCaretLeft />
          </IconButton>
        )}
        <Typography variant="h4">{title}</Typography>
      </Grid>
    </Container>
  );
};

export default Header;
