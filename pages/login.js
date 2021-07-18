import React from "react";
import useStyles from "../styles/usestyles";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import Link from "next/link";
import AlertMessage from "../components/alerts";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Button,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Container,
  Typography,
} from "@material-ui/core";

export default function Login({ children }) {
  const classes = useStyles();

  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [showMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      setMessage(`Welcome ${result.user.displayName}`);
      setSeverity("success");
      setShowMessage(true);
    } catch (err) {
      setMessage(err.message);
      setSeverity("error");
      setShowMessage(true);
    }
    console.log(email, password);
  };
  return (
    <div>
      {showMessage ? <AlertMessage message={message} type={severity} /> : <></>}
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" component="h1">
          Login
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl noValidate fullWidth>
            <TextField
              className={classes.field}
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              className={classes.field}
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" color="primary" type="submit">
              Signin
            </Button>
          </FormControl>
        </form>
        <Typography align="center">
          Don't have an account? <Link href="/signup">Signup</Link>
        </Typography>
      </Container>
      {children}
    </div>
  );
}
