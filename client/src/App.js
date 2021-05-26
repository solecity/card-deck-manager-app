// base
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// custom components
import { Home, Collections, Cards, Admin } from "./pages";
import { NavBar } from "./components";

// styles
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact from="/" render={() => <Home />} />
          <Route exact from="/login" render={() => <Home isLogin={true} />} />
          <Route
            exact
            from="/register"
            render={() => <Home isLogin={false} />}
          />
          <Route exact from="/collections" render={() => <Collections />} />
          <Route exact from="/cards" render={() => <Cards />} />
          <Route exact from="/admin" render={() => <Admin />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
