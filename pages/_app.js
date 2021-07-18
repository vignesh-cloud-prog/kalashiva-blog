import "../styles/globals.css";
import Head from "next/dist/next-server/lib/head";
import Navbar from "../components/navbar";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  }, []);
  return (
    <>
     
        <Head>
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
          />

          <script
            defer
            src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
          ></script> */}

          {/* use defer in script tag */}
        </Head>
        <Navbar user={user} />
        <Component {...pageProps} user={user} />
      
    </>
  );
}

export default MyApp;
