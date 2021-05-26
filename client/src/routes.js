// base
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// custom components
import { Login, Register, Collections, Cards, Admin } from "./pages";

// utils
import { getJWT } from "./utils/jwt";

const Routes = () => {
  const location = useLocation();

  const token = getJWT();

  if (
    !token &&
    !(location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Redirect to="/login" />;
  }

  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Redirect to="/cards" />;
  }

  return (
    <Switch>
      <Route exact from="/" render={() => <Cards />} />
      <Route exact from="/login" render={() => <Login />} />
      <Route exact from="/register" render={() => <Register />} />
      <Route exact from="/cards" render={() => <Cards />} />
      <Route exact from="/collections" render={() => <Collections />} />
      <Route exact from="/admin" render={() => <Admin />} />
    </Switch>
  );
};

export default Routes;
