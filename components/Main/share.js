import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Share() {
  const [open, setOpen] = React.useState(false);
  const socials = [
    {
      name: "whatsapp",
      file: "whatsapp.gif",
    },
    {
      name: "facebook",
      file: "facebook.gif",
    },
    {
      name: "instagram",
      file: "instagram.gif",
    },
    {
      name: "mail",
      file: "mail.gif",
    },
    {
      name: "telegram",
      file: "telegram.gif",
    },
    {
      name: "twitter",
      file: "twitter.gif",
    },
  ];
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
            <Grid container justifyContent="space-between">

          <Typography variant="h6">Share now</Typography>

          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
            </Grid>
        </DialogTitle>
        <DialogActions>
          <Grid container alignItems="center" justifyContent="center">
            {socials.map((social) => (
              <Grid item xs={3} key={social.name}>
                <Image
                  src={`/icons/${social.file}`}
                  alt={`${social.name}-icon`}
                  layout="responsive"
                  width={5}
                  height={5}
                />
                <Typography>{social.name}</Typography>
              </Grid>
            ))}
           
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
