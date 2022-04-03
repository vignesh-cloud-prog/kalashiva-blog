import "../styles/globals.css";
import Share from "../components/Main/share";
import Navbar from "../components/layout/navbar";
import Alerts from "../components/Main/alerts";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Head from "next/head";
import { ShareContextProvider } from "../store/share_context";
import { MessageContextProvider } from "../store/message_context";
import { db } from "../firebase/firebase";
import {
  getUserCollection,
  getUserReadLater,
} from "../components/helperFunc/userData";
import { UserContextProvider } from "../store/user_context";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import CopyRight from "../components/Main/copyRight";


TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
  
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-HX2WW6VX6T');
  
  });
  return (
    <>
      <MessageContextProvider>
        <ShareContextProvider>
          <UserContextProvider>
            <Head>
              <title>kaalashiva</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <meta name="author" content="Vijay viji kaalashiva" />
              <meta
                name="description"
                content="Kaalashiva is kannada blogging website. You can read beautiful stories, novel and articles."
              />
              <meta
                name="keywords"
                content="kannada, kaalashiva, blog, story, article"
              />
              {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HX2WW6VX6T"></script>
{/* google adsense */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3063366338027716"
     crossOrigin="anonymous"></script>

            </Head>
            <Navbar />
            <Component {...pageProps} />
            <Alerts />
            <Share />
            <CopyRight/>
          </UserContextProvider>
        </ShareContextProvider>
      </MessageContextProvider>
    </>
  );
}

export default MyApp;
