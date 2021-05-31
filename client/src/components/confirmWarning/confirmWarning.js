// base
import React from "react";

// external components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// styles
import useStyles from "./styles";

const ConfirmWarning = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>You cannot delete yourself</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} className={classes.cancel}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmWarning;
