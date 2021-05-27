// base
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// custom components
import { Home, Login, Register, Collections, Cards, Admin } from "./pages";

// hooks
import { useAuth } from "./hooks/useAuth";

const Routes = () => {
  const location = useLocation();

  const { _token } = useAuth();

  if (
    !_token &&
    !(
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/register"
    )
  ) {
    return <Redirect to="/login" />;
  }

  if (
    _token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Redirect to="/cards" />;
  }

  return (
    <Switch>
      <Route exact from="/" render={() => <Home />} />
      <Route exact from="/login" render={() => <Login />} />
      <Route exact from="/register" render={() => <Register />} />
      <Route exact from="/cards" render={() => <Cards />} />
      <Route exact from="/collections" render={() => <Collections />} />
      <Route exact from="/admin" render={() => <Admin />} />
    </Switch>
  );
};

export default Routes;
