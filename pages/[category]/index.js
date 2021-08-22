// Components
import BlogCard from "../../components/Blog/BlogCard";
import Main from "../../components/layout/mainLayout";

// Material ui Components
import { Container, Grid, Typography } from "@material-ui/core";

// Firebase
import { db } from "../../firebase/firebase";
import { useContext } from "react";

export default function Categories({ blogs, category, featuredBlogs }) {
  return (
    <Main featuredBlogs={featuredBlogs}>
      <h1>{`${category}`}</h1>
      {blogs?.length ? (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} md={6} lg={3} key={blog.id}>
              <BlogCard
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
      ) : (
        <Typography>{`no ${category} are available`}</Typography>
      )}
    </Main>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts by category

  const querySnap = await db.collection("blogs").get();
  const posts = querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  });
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { category: post.category },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { category } }) {
  // Create a reference to the blogs collection
  const allBlogs = db.collection("blogs");

  // Create a query against the collection
  const blogsSnap = await allBlogs.where("category", "==", category).get();

  // Create blogs array
  const blogs = blogsSnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });

  // Getting Featured blogs
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

  return {
    props: { blogs, category, featuredBlogs }, // will be passed to the page component as props
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
