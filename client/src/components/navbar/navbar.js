// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { BiLogOutCircle } from "react-icons/bi";

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
            <Button color="inherit" onClick={() => history.push("/account")}>
              Account
            </Button>
            <IconButton color="secondary" onClick={handleLogout}>
              <BiLogOutCircle />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
