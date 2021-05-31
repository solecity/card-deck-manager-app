import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "80%"
  },
  form: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  link: {
    color: theme.palette.secondary.main
  }
}));
