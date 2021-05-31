// base
import React from "react";

// external components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// styles
import useStyles from "./styles";

const ConfirmDelete = ({ open, handleClose, handleDelete, item, name }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        {`Are you sure you want to delete the ${item} "${name}"?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} className={classes.cancel}>
          Cancel
        </Button>
        <Button onClick={handleDelete} className={classes.confirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
