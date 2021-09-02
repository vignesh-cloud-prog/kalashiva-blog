// Next related
import styles from "../styles/Home.module.css";
import Link from "next/link";

// React related
import { useContext, useEffect, useState } from "react";

// Matrial Ui components
import {
  Container,
  Grid,
  Button,
  CircularProgress,
  Fab,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import homeStyles from "../styles/homeStyles";

// Components
import Main from "../components/layout/mainLayout";
import BlogCard from "../components/Blog/BlogCard";
import UserContext from "../store/user_context";

// Firebase related import
import { db } from "../firebase/firebase";

export default function Home({ allBlogs, featuredBlogs, topBlogs }) {
  // Checking email for admin to provide extra functionality
  const userContext = useContext(UserContext);
  const { user } = userContext;
  let userEmail;
  if (user != null) userEmail = user["email"];

  // Styles from material ui useStyle
  const classes = homeStyles();

  // React state
  const [blogs, setBlogs] = useState(allBlogs);
  const [allTopBlogs, setAllTopBlogs] = useState(topBlogs);
  const [endRecent, setEndRecent] = useState(false);
  const [endFamous, setEndFamous] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to load more Recent Blogs
  const loadMoreRecent = async () => {
    setLoading(true);
    const last = blogs[blogs.length - 1];
    const res = await db
      .collection("blogdetails")
      .orderBy("createdAt", "desc")
      .startAfter(new Date(last.createdAt))
      .limit(4)
      .get();
    const newblogs = res.docs.map((docSnap) => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id,
      };
    });
    setBlogs(blogs.concat(newblogs));

    if (newblogs.length < 4) {
      setEndRecent(true);
    }

    setLoading(false);
  };
  // Function to load more Famous Blogs
  const loadMoreTop = async () => {
    setLoading(true);
    const last = allTopBlogs[allTopBlogs.length - 1];
    const res = await db
      .collection("blogdetails")
      .orderBy("viewCount", "desc")
      .startAfter(last.viewCount)
      .limit(4)
      .get();
    const newblogs = res.docs.map((docSnap) => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id,
      };
    });
    setAllTopBlogs(allTopBlogs.concat(newblogs));

    if (newblogs.length < 4) {
      setEndFamous(true);
    }

    setLoading(false);
  };

  return (
    <Main featuredBlogs={featuredBlogs}>
      <h1>ಇತ್ತೀಚಿಗೆನವುಗಳು</h1>
      {blogs?.length ? (
        <>
          {" "}
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid item xs={12} md={6} lg={3} key={blog.id}>
                <BlogCard
                  user={user}
                  image={blog?.imageURL}
                  title={blog?.title}
                  slug={blog?.slug}
                  desc={blog?.desc}
                  id={blog?.id}
                  category={blog?.category}
                  createdAt={blog?.createdAt}
                />
              </Grid>
            ))}
          </Grid>
          {endRecent == false ? (
            <>
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={() => loadMoreRecent()}
                >
                  ಇನ್ನಷ್ಟು
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                     
                      left: "50%",
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <Typography align="center">You have reached the end</Typography>
          )}
        </>
      ) : (
        <Typography align="center">No Blogs are available</Typography>
      )}
      <h1>ಜನಪ್ರಿಯ</h1>
      {allTopBlogs?.length ? (
        <>
          {" "}
          <Grid container spacing={3}>
            {allTopBlogs.map((blog) => (
              <Grid item xs={12} md={6} lg={3} key={blog.id}>
                <BlogCard
                  user={user}
                  image={blog?.imageURL}
                  title={blog?.title}
                  slug={blog?.slug}
                  desc={blog?.desc}
                  id={blog?.id}
                  category={blog?.category}
                  createdAt={blog?.createdAt}
                />
              </Grid>
            ))}
          </Grid>
          {endFamous == false ? (
            <>
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={() => loadMoreTop()}
                >
                  ಇನ್ನಷ್ಟು
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      
                      left: "50%",
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <Typography align="center">You have reached the end</Typography>
          )}
        </>
      ) : (
        <Typography align="center">No Blogs are available</Typography>
      )}

      {/* Admin have the option to add new blogs in this home page */}
      {userEmail == "kaalashiva.kar@gmail.com" ? (
        <Link href="admin/createblog">
          <a>
            <Fab
              color="primary"
              aria-label="add"
              style={{
                position: "fixed",
                bottom: "2vh",
                right: "2vh",
              }}
            >
              <AddIcon />
            </Fab>
          </a>
        </Link>
      ) : null}
    </Main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  // Fetching Recent blogs for
  const querySnap = await db
    .collection("blogdetails")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(4)
    .get();
  const allBlogs = querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });

  // Fetching Recent blogs for
  const topQuerySnap = await db
    .collection("blogdetails")
    .where("published", "==", true)
    .orderBy("viewCount", "desc")
    .limit(4)
    .get();
  const topBlogs = topQuerySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });

  // Fetching Featured Blogs
  const blogSnap = await db
    .collection("blogdetails")
    .where("published", "==", true)
    .where("featured", "==", true)
    .limit(5)
    .get();
  const featuredBlogs = blogSnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });
  // Pass data to the page via props
  return {
    props: { allBlogs, featuredBlogs, topBlogs },
  };
}
