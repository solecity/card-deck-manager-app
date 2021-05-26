// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

// styles
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();

  const history = useHistory();

  const isAuth = false;

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h5">
          Card Deck Manager
        </Typography>
        {isAuth ? (
          <div>
            <Button
              color="inherit"
              onClick={() => history.push("/collections")}
            >
              Collections
            </Button>
            <Button color="inherit" onClick={() => history.push("/cards")}>
              Cards
            </Button>
            <Button color="inherit" onClick={() => history.push("/admin")}>
              Admin
            </Button>
          </div>
        ) : (
          <div>
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => history.push("/register")}>
              Register
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
