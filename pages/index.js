import { db } from "../firebase/firebase";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Container, Grid, Button, CircularProgress } from "@material-ui/core";
import BlogCard from "../components/Blog/BlogCard";
import homeStyles from "../styles/homeStyles";
<<<<<<< HEAD
import Main from "../components/layout/mainLayout";

export default function Home({ allBlogs, featuredBlogs }) {
=======
import Slider from "../components/Blog/slider";
import HomeTabs from "../components/Main/tabs";
import Main from "../components/layout/mainLayout";

export default function Home({ allBlogs,featuredBlogs }) {
  const [load, setLoad] = useState(false);
>>>>>>> 9b9be2ed83286c9bf263454ec9ac45a0c0314a4f
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
    <Container>
      <Main featuredBlogs={featuredBlogs}>
<<<<<<< HEAD
        <div>
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
                    style={{position:"absolute",top:"0",bottom:"0",right:"0",left:"0"}}
                  />
                )}
              </div>
              
            </>
          ) : (
            <h3>You have reached end</h3>
          )}
        </div>
      </Main>
=======
    <div >
      {load ? <CircularProgress /> : <></>}
      {/* <Slider featuredBlogs={featuredBlogs}/>
      <HomeTabs /> */}
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} md={6} lg={4} key={blog.id}>
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

        {end == false ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => loadMore()}
          >
            LOAD MORE
          </Button>
        ) : (
          <h3>You have reached end</h3>
        )}
     
    </div>
    </Main>
>>>>>>> 9b9be2ed83286c9bf263454ec9ac45a0c0314a4f
    </Container>
  );
}

// This gets called on every request
export async function getServerSideProps() {
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
  return { props: { allBlogs, featuredBlogs } };
}
