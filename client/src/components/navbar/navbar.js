// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

// hooks
import { useAuth } from "../../hooks/useAuth";

// constants
import { USER_TYPES } from "../../constants/general";

// styles
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();

  const history = useHistory();

  const { logout, _token, userType } = useAuth();

  const handleLogout = () => {
    logout();
  };

  console.log(userType);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h5">
          Card Deck Manager
        </Typography>
        {Boolean(_token) ? (
          <div>
            {userType === USER_TYPES.ADMIN && (
              <Button color="inherit" onClick={() => history.push("/admin")}>
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={() => history.push("/cards")}>
              Cards
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/collections")}
            >
              Collections
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
