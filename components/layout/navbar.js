import React from "react";
import { auth } from "../../firebase/firebase";
import Link from "next/link";
import Alerts from "../Main/alerts";
import { useState, useEffect } from "react";
import navStyles from "../../styles/navStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Avatar, Menu, MenuItem } from "@material-ui/core";

export default function Navbar({ user }) {
  const navClass = navStyles();

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [showMessage]);

  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  return (
    <div className={navClass.nav}>
      <AppBar position="fixed">
        <Toolbar>
          <Avatar
            alt="Kaalashiva"
            variant="rounded"
            src="https://image.shutterstock.com/image-photo/adiyogi-lord-shiva-statue-isha-260nw-1886897623.jpg"
            className={navClass.menuButton}
          />
          <Typography variant="h6" className={navClass.title}>
            <Link href="/">ಕಾಲಶಿವ</Link>
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-userBar"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar alt={user?.displayName} src={user?.photoURL} />
          </IconButton>

          {user ? (
            <>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="menu-userBar"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem
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
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="menu-userBar"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link href="login">Login</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="signup">Signup</Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {showMessage ? <Alerts message={message} type={severity} /> : <></>}
    </div>
  );
}
