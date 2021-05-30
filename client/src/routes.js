// base
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// custom components
import {
  Home,
  Login,
  Register,
  Account,
  UserDetails,
  Cards,
  CardDetails,
  Collections,
  CollectionDetails,
  Admin
} from "./pages";

// hooks
import { useAuth } from "./hooks/useAuth";

// constants
import { USER_TYPES } from "./constants/general";

const Routes = () => {
  const location = useLocation();

  const { _token, userType } = useAuth();

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

  if (userType !== USER_TYPES.ADMIN && location.pathname === "/admin") {
    return <Redirect to="/cards" />;
  }

  return (
    <Switch>
      <Route exact from="/" render={() => <Home />} />
      <Route exact from="/login" render={() => <Login />} />
      <Route exact from="/register" render={() => <Register />} />
      <Route exact from="/account" render={() => <Account />} />
      <Route exact from="/userDetails" render={() => <UserDetails />} />
      <Route exact from="/cards" render={() => <Cards />} />
      <Route exact from="/cardDetails" render={() => <CardDetails />} />
      <Route exact from="/collections" render={() => <Collections />} />
      <Route
        exact
        from="/collectionDetails"
        render={() => <CollectionDetails />}
      />
      <Route exact from="/admin" render={() => <Admin />} />
    </Switch>
  );
};

export default Routes;
