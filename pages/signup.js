import React from "react";
import { useState,useEffect } from "react";
import { auth } from "../firebase";
import Link from "next/link";
import AlertMessage from "../components/alerts";

import useStyles from "../styles/usestyles";
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

export default function Signup() {
  const classes = useStyles();
  const [name, setName] = useState(``);
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
      const result = await auth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({
        displayName: name,
      });
      setMessage(`Welcome ${result.user.displayName}`);
      setSeverity("success");
      setShowMessage(true);
    } catch (err) {
      setMessage(err.message);
      setSeverity("error");
      setShowMessage(true);
    }
  };
  return (
    <div>
      {showMessage ? <AlertMessage message={message} type={severity} /> : <></>}
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" component="h1">
          Signup
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl noValidate fullWidth>
            <TextField
              className={classes.field}
              type="text"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Signup
            </Button>
          </FormControl>
        </form>
        <Typography align="center">
          <Link href="/login">Already have an account? Login</Link>
        </Typography>
      </Container>
    </div>
  );
}
