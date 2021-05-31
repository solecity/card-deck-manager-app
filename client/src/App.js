// base
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// external components
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

// custom components
import { NavBar } from "./components";

// routes
import Routes from "./routes";

// context
import { AuthProvider } from "./context/auth";

// styles
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
