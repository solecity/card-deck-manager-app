// base
import React from "react";

// external components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// styles
import useStyles from "./styles.js";

const Header = ({ title }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4">{title}</Typography>
    </Container>
  );
};

export default Header;
