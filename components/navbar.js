import React from "react";
import { auth } from "../firebase/firebase";
import Link from "next/link";
import AlertMessage from "./alerts";
import { useState,useEffect } from "react";

import useStyles from "../styles/usestyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function Navbar({ user }) {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [showMessage]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">Kaalashiva</Link>
          </Typography>

          {user ? (
            <>
              <Button color="inherit">
                <Link href="/createblog">Create BLog</Link>
              </Button>

              <Button
                color="inherit"
                onClick={() => {
                  auth
                    .signOut()
                    .then(() => {
                      setMessage("Log-out Successful");
                      setSeverity("success");
                      setShowMessage(true);
                    })
                    .catch((error) => {
                      setMessage(`${error.message} - ${error.code}`);
                      setSeverity("error");
                      setShowMessage(true);
                    });
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link href="/login">Login</Link>
              </Button>
              <Button color="inherit">
                <Link href="/signup">Signup</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {showMessage ? <AlertMessage message={message} type={severity} /> : <></>}
    </div>
  );
}
