import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  title: {
    fontSize: "1rem"
  },
  cancel: {
    color: theme.palette.secondary.dark
  },
  confirm: {
    backgroundColor: theme.palette.secondary.main
  }
}));
