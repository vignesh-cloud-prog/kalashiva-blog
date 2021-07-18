import React from "react";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../styles/usestyles";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

export default function AlertMessage({ message, type }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  
  return (
    
    <div className={classes.alert}>
      <Collapse in={open}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
      
    </div>
  );
}
