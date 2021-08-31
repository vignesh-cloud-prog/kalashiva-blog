// Components
import BlogCard from "../../components/Blog/BlogCard";
import Main from "../../components/layout/mainLayout";

// Material ui Components
import { Container, Grid, Typography } from "@material-ui/core";

// Firebase
import { db } from "../../firebase/firebase";
import { useContext } from "react";

export default function Categories({ blogs, category, featuredBlogs, user }) {
  return (
    <Main featuredBlogs={featuredBlogs}>
      <h1>{`${category}`}</h1>
      {blogs?.length ? (
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
      ) : (
        <Typography>{`no ${category} are available`}</Typography>
      )}
    </Main>
  );
}


export async function getServerSideProps({ params: { category } }) {
  // Create a reference to the blogs collection
  const allBlogs = db.collection("blogdetails");

  // Create a query against the collection
  const blogsSnap = await allBlogs
    .where("published", "==", true)
    .where("category", "==", category)
    .get();

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

  return {
    props: { blogs, category, featuredBlogs }
  };
}
