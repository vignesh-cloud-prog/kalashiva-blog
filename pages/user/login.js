// Next JS related
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// Firebase related
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

// Components
import OAuth from "../../components/oAuth";

// Styles
import LoginStyle from "../../styles/loginStyles";
// React
import { useState,useContext} from "react";
import MessageContext from "../../store/message_context";
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
  const classes = LoginStyle();
  const data = useContext(MessageContext)
  const {addMessage}=data
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [showPassword, setShowPassword] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // if (loading) return <Loading />
  if (loading) return <h1>Loading</h1>;
  // else if (error) return <Error msg={error} />
  else if (error) return <h1>{error}</h1>;
  else if (user) {
    // user is already logged in, redirect to home page
    router.back()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      addMessage(`Welcome ${result.user.displayName}`,"success",3000)
      
    } catch (err) {
      addMessage(err.message,"error")
     
    }
  };

  return (
    <div>
      <Head>
        <title>Kaalashiva | LogIn</title>
        <meta
          name="description"
          content="Login to kaalashiva, kannada blogs website"
        />
      </Head>
      <Container maxWidth="sm">
        <Container maxWidth="sm" className={classes.padd}>
          <div className={classes.mb}>
            <Image
              src="/kaalashiva.jpeg"
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
              Kalashiva - Login
            </Typography>
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
            Don&apos;t have an account&#63; <Link href="/user/signup">Signup</Link>
          </Typography>
        </Container>
        <Typography align="center">or</Typography>
        <OAuth />
      </Container>
      {children}
    </div>
  );
}
