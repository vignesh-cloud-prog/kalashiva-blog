import { db } from "../firebase/firebase";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  Container,
  Grid,
  Button,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import BlogCard from "../components/Blog/BlogCard";
import homeStyles from "../styles/homeStyles";
import Main from "../components/layout/mainLayout";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";

function Home({ allBlogs, featuredBlogs, user }) {
  let userEmail;
  if (user != null) userEmail = user["email"];


  const classes = homeStyles();
  const [blogs, setBlogs] = useState(allBlogs);
  const [end, setEnd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadMore = async () => {
    setSuccess(false);
    setLoading(true);
    const last = blogs[blogs.length - 1];
    const res = await db
      .collection("blogs")
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
      setEnd(true);
    }
    setSuccess(true);
    setLoading(false);
  };
  return (
    <Main featuredBlogs={featuredBlogs}>
      <h1>Recent Blogs</h1>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} lg={3} key={blog.id}>
            <BlogCard
              image={blog?.imageURL}
              title={blog?.title}
              slug={blog?.slug}
              desc={blog?.desc}
              id={blog?.id}
              catergory={blog?.catergory}
              createdAt={blog?.createdAt}
            />
          </Grid>
        ))}
      </Grid>
      {userEmail == "kaalashiva.kar@gmail.com" ? (
        <Link href="admin/createblog">
          <a >
          <Fab
            color="primary"
            aria-label="add"
            style={{
              position: "absolute",
              bottom: "2vh",
              right: "2vh",
            }}
          >
            <AddIcon />
          </Fab>
          </a>
        </Link>
      ) : null}
      {end == false ? (
        <>
          <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => loadMore()}
            >
              LOAD MORE
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  right: "0",
                  left: "0",
                }}
              />
            )}
          </div>
        </>
      ) : (
        <h3>You have reached end</h3>
      )}
    </Main>
  );
}

export default Home;

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const querySnap = await db
    .collection("blogs")
    .orderBy("createdAt", "desc")
    .limit(8)
    .get();
  const allBlogs = querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });

  const blogSnap = await db
    .collection("blogs")
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
    props: { allBlogs, featuredBlogs },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
