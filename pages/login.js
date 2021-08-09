// Next JS related
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// Firebase related
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

// Components
import AlertMessage from "../components/alerts";
import OAuth from "../components/oAuth";

// Styles
import useStyles from "../styles/usestyles";
import clsx from "clsx";

// React
import { useState, useEffect } from "react";

// Material ui Componenets
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

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // if (loading) return <Loading />
  if (loading) return <h1>Loading</h1>;
  // else if (error) return <Error msg={error} />
  else if (error) return <h1>{error}</h1>;
  else if (user) {
    // user is already logged in, redirect to home page
    router.push("/");
  }

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
    
  };

  
  return (
    <div>
      <Head>
        <title>Kaalashiva | LogIn</title>
      </Head>
      {showMessage ? <AlertMessage message={message} type={severity} /> : <></>}
      <Container maxWidth="sm">
        <div>
          <h1>Kalashiva - Login</h1>
        </div>
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
          Don&apos;t have an account&#63; <Link href="/signup">Signup</Link>
        </Typography>
        <Typography>or</Typography>
        <OAuth/>
      </Container>
      {children}
    </div>
  );
}
