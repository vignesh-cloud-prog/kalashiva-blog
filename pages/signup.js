// React components
import React from "react";
import { useState, useContext } from "react";

// Firebase auth components
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

// Next components
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

// Componetnts
import MessageContext from "../store/message_context";

// Material ui components
import SignupStyle from "../styles/signupStyles";
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
import OAuth from "../components/oAuth";

export default function Signup() {
  const classes = SignupStyle();
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [showPassword, setShowPassword] = useState(false);

  const data = useContext(MessageContext)
  const {addMessage}=data

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
      const result = await auth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({
        displayName: name,
      });
      addMessage(`Welcome ${result.user.displayName}`,"success")
      
    } catch (err) {
      addMessage(err.message,"error")
      
    }
  };
  return (
    <div>
      <Head>
        <title>Kaalashiva - Signup</title>
        <meta
          name="description"
          content="Signup to kaalashiva, kannada blogs website"
        />
      </Head>
      <Container maxWidth="sm">
        <Container maxWidth="sm" className={classes.padd}>
          <div className={classes.mb}>
            <Image
              src="/kaalashiva.jpg"
              layout="responsive"
              height="30vh"
              width="80vw"
              alt="kaalashiva-icon"
            />
            <Typography
              variant="h5"
              align="center"
              variantMapping={{ h1: "h1" }}
            >
              Kalashiva - Signup
            </Typography>
          </div>
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
            <Link href="login">Already have an account&#63; Login</Link>
          </Typography>
        </Container>
        <Typography align="center">or</Typography>
        <OAuth />
      </Container>
    </div>
  );
}
