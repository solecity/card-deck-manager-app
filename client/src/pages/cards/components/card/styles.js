import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    height: 280
  },
  box: {
    height: 120
  },
  diamond: {
    margin: "3px 4px 0 0",
    color: theme.palette.secondary.dark,
    fontSize: "small"
  },
  buttons: {
    marginRight: ".2rem",
    justifyContent: "flex-end"
  }
}));
