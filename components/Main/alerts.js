import React, { useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import MessageContext from "../../store/message_context";

export default function Alerts() {
  const data = useContext(MessageContext);
  const {open, msg, type,duration=6000} = data.message;
  const { removeMessage } = data;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    removeMessage();
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
