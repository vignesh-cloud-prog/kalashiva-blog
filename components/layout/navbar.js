import React, { useContext } from "react";
import { auth } from "../../firebase/firebase";
import Link from "next/link";
import MessageContext from "../../store/message_context";
import { useState, useEffect } from "react";
import navStyles from "../../styles/navStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { Avatar, Divider, Menu, MenuItem } from "@material-ui/core";
import UserContext from "../../store/user_context";
import { AccountCircle } from "@material-ui/icons";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const navClass = navStyles();

  const data = useContext(MessageContext);
  const { addMessage } = data;

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
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <a>
              <Avatar
                alt="Kaalashiva"
                variant="rounded"
                src="/kaalashiva.jpeg"
                className={navClass.menuButton}
              />
            </a>
          </Link>

          <Typography variant="h6" className={navClass.title}>
            <Link href="/">
              <a>ಕಾಲಶಿವ</a>
            </Link>
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
                <Link href="/user">
                  <a>
                    <MenuItem style={{ color: "MenuText" }}>
                      <IconButton
                        onClick={handleMenuClose}
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      Profile
                    </MenuItem>
                  </a>
                </Link>
                <Divider variant="center" />
                <Link href="/user">
                  <a>
                    <MenuItem style={{ color: "MenuText" }}>
                      <IconButton
                        onClick={handleMenuClose}
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <BookmarkOutlinedIcon />
                      </IconButton>
                      My Collections
                    </MenuItem>
                  </a>
                </Link>
                <Link href="/user">
                  <a>
                    <MenuItem style={{ color: "MenuText" }}>
                      <IconButton
                        onClick={handleMenuClose}
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <LibraryAddCheckIcon />
                      </IconButton>
                      My Read laters
                    </MenuItem>
                  </a>
                </Link>
                <Divider variant="center" />
                <MenuItem
                  onClick={() => {
                    auth
                      .signOut()
                      .then(() => {
                        addMessage("Logout Successful", "success");
                      })
                      .catch((error) => {
                        addMessage(`${error.message} - ${error.code}`, "error");
                      });
                  }}
                >
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <ExitToAppIcon />
                  </IconButton>
                  <p>Logout</p>
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
                <Link href="/user/login">
                  <a>
                    <MenuItem style={{ color: "MenuText" }}>
                      <IconButton
                        onClick={handleMenuClose}
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      Login
                    </MenuItem>
                  </a>
                </Link>
                <Link href="/user/signup">
                  <a>
                    <MenuItem style={{ color: "MenuText" }}>
                      <IconButton
                        onClick={handleMenuClose}
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      Signup
                    </MenuItem>
                  </a>
                </Link>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
