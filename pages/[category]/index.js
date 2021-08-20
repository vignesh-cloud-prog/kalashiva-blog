import { Container, Grid } from "@material-ui/core";
import BlogCard from "../../components/Blog/BlogCard";
import React from "react";
import { db } from "../../firebase/firebase";
import Main from "../../components/layout/mainLayout";

export default function Categories({ blogs, category, featuredBlogs }) {
  return (
    <Main featuredBlogs={featuredBlogs}>
      <h1>{`${category}`}</h1>
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
    </Main>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  const querySnap = await db.collection("blogs").get();
  const posts = querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  });
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { category: post.catergory },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { category } }) {
  // Create a reference to the blogsF collection
  const allBlogs = db.collection("blogs");

  // Create a query against the collection
  const blogsSnap = await allBlogs.where("catergory", "==", category).get();

  // Create blogs array
  const blogs = blogsSnap.docs.map((docSnap) => {
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
  return {
    props: { blogs, category, featuredBlogs }, // will be passed to the page component as props
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
