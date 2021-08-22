import "../styles/globals.css";
import Share from "../components/Main/share";
import Navbar from "../components/layout/navbar";
import Alerts from "../components/Main/alerts";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Head from "next/head";
import {ShareContextProvider} from "../store/share_context";
import { MessageContextProvider } from "../store/message_context";
// import TimeAgo from "javascript-time-ago";

// import en from "javascript-time-ago/locale/en";
// import ru from "javascript-time-ago/locale/ru";

// TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(ru);

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
    <MessageContextProvider>
    <ShareContextProvider>
      
      <Head>
        <title>kaalashiva</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Vijay viji kaalashiva" />
        <meta
          name="description"
          content="Kaalashiva is kannada blogging website. You can read beautiful stories, novel and articles."
        />
        <meta
          name="keywords"
          content="kannada, kaalashiva, blog, story, article"
        />
      </Head>
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
      <Alerts/>
      <Share />
      </ShareContextProvider>
      </MessageContextProvider>
    </>
  );
}

export default MyApp;
