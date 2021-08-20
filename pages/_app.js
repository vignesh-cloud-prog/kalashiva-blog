import "../styles/globals.css";
import Share from "../components/Main/share";
import Navbar from "../components/layout/navbar";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

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
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
      <Share />
    </>
  );
}

export default MyApp;
