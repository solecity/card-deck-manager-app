// base
import React from "react";
import { useHistory } from "react-router-dom";

// external components
import { AppBar, Toolbar, Button } from "@material-ui/core";

const NavBar = () => {
  const history = useHistory();

  const isAuth = false;

  return (
    <AppBar position="static">
      <Toolbar>
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
            </Button>{" "}
          </div>
        ) : (
          <Button color="inherit" onClick={() => history.push("/")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
