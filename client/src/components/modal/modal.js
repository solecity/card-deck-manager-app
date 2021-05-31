// base
import React from "react";

// external components
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// styles
import useStyles from "./styles.js";

const ModalComp = ({ open, handleClose, title, children }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalComp;
