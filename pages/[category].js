import { Container,Grid } from "@material-ui/core";
import BlogCard from "../components/BlogCard";
import React from "react";
import { db } from "../firebase/firebase";

export default function Categories({blogs,category}) {
    console.log(blogs,category);
  return (
    <div>
      <h1>{`${category}`}</h1>
      <Container maxWidth="md">
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
        </Container>
    </div>
  );
}

export async function getServerSideProps({ params: { category } }) {
  console.log("props" + category);
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

  return {
    props: { blogs,category }, // will be passed to the page component as props
  };
}
