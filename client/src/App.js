// base
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// custom components
import { NavBar } from "./components";

// routes
import Routes from "./routes";

// context
import { AuthProvider } from "./context/auth";

// styles
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
