// base
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// custom components
import { NavBar } from "./components";
import Routes from "./routes";

// context
import { AuthProvider } from "./context/auth";

// utils
import history from "./utils/history";

// styles
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router history={history}>
          <NavBar />
          <Routes />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
