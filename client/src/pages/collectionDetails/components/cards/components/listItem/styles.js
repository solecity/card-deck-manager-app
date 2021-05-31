import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    maxHeight: 80,
    margin: ".8rem 1rem"
  },
  content: {
    padding: ".5rem 1.2rem"
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
