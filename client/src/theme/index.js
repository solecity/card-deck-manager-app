import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: { default: "#4d4d4d" },
    primary: { main: "#242424" },
    secondary: { main: "#ffd517", dark: "#e8a302" }
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#383838"
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: "#383838"
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: "1.2px solid #383838"
      }
    },
    MuiInputAdornment: {
      root: {
        color: "#ffd517"
      }
    },
    MuiIconButton: {
      root: {
        color: "#ffd517"
      }
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#ffd517",
        color: "#383838"
      }
    }
  }
});

export default theme;
