// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

// hooks
import { useAuth } from "../../hooks/useAuth";

// utils
import { getJWT } from "../../utils/jwt";

// styles
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();

  const history = useHistory();

  const { logout } = useAuth();

  let isAuth = false;

  if (getJWT()) {
    isAuth = true;
  }

  const handleLogout = () => {
    isAuth = false;

    logout();

    history.push("/");
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h5">
          Card Deck Manager
        </Typography>
        {isAuth ? (
          <div>
            <Button color="inherit" onClick={() => history.push("/cards")}>
              Cards
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/collections")}
            >
              Collections
            </Button>
            <Button color="inherit" onClick={() => history.push("/admin")}>
              Admin
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
