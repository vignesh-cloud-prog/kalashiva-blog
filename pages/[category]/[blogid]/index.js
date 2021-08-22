// React related

import { useEffect, useState,useContext } from "react";

// Next related
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Material ui components
import {
  Avatar,
  Container,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { Send } from "@material-ui/icons";

// Components
import MessageContext from "../../../store/message_context";

// Firebase
import { db, serverTimeStamp,increment } from "../../../firebase/firebase";

export default function BlogDetails({ blog, user, allComments }) {
  // Checking Amin for providing special functionality
  let userEmail;
  if (user != null) userEmail = user["email"];

  const toolStyle = { display: "none" };
  const [comment, setComment] = useState("");
  const [comments, setAllComments] = useState(allComments);

  const data = useContext(MessageContext)
  const {addMessage}=data

  const router = useRouter();
  const { blogid, category } = router.query;

  const incrementViewCount = () => {
    // Document reference
    const blogRef = db.collection("blogs").doc(blogid);

    // Update read count
    blogRef.update({ viewCount: increment });
  };

  useEffect(() => {
    incrementViewCount()
  }, [])
  const makeComment = async () => {
    // Function make comments by user related to post
    try {
      await db.collection("blogs").doc(blogid).collection("comments").add({
        text: comment,
        name: user.displayName,
        photo: user.photoURL,
      });
      const commentQuery = await db
        .collection("blogs")
        .doc(blogid)
        .collection("comments")
        .get();
      setAllComments(commentQuery.docs.map((docSnap) => docSnap.data()));
      addMessage(`Your comment added`,"success")
      
    } catch (error) {
      addMessage(err.message,"error")
      
    }
    setComment("");
  };
  
  return (
    <Container>
      <Head>
        <title>{`${blog.title} | kaalashiva`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${blog.desc}`} />
      </Head>
      <h1>{blog.title}</h1>
      <h5>created on - {new Date(blog.createdAt).toDateString()}</h5>
      <Image
        width="90vh"
        height="30vw"
        layout="responsive"
        src={blog.imageURL}
        alt="image"
      />

      <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
      <Typography variant="h5">Comments</Typography>
      {user ? (
        <>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Avatar alt={user?.displayName} src={user?.photoURL} />
            </Grid>
            <Grid item>
              <TextField
                className="{classes.margin}"
                id="input-with-icon-comment"
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="input-with-icon-comment"
                        onClick={() => makeComment()}
                      >
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>Please login to make comment</a>
          </Link>
        </>
      )}

      <hr />
      {comments.length != 0 ? (
        <div>
          {comments.map((cmt) => {
            return (
              <>
                <Grid container spacing={1} alignItems="flex-end" key={cmt?.at}>
                  <Grid item style={{ margin: "0.5rem" }}>
                    <Avatar alt={user?.name} src={cmt?.photo} />
                  </Grid>
                  <Grid item style={{ margin: "0.5rem" }}>
                    <Typography variant="h6">
                      {cmt?.name}
                      {/* <ReactTimeAgo date={cmt?.at} locale="en-US" /> */}
                    </Typography>
                    <Typography variant="body1">{cmt?.text}</Typography>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </div>
      ) : (
        <p>No comments at</p>
      )}

      {userEmail == "kaalashiva.kar@gmail.com" ? (
        <Link href={`/${category}/${blogid}/update`} replace>
          <a>
            <Fab
              color="secondary"
              aria-label="edit"
              style={{
                position: "fixed",
                bottom: "2vh",
                right: "2vh",
              }}
            >
              <EditIcon />
            </Fab>
          </a>
        </Link>
      ) : null}
    </Container>
  );
}

// This function gets called at build time
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
    params: { category: post.category, blogid: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This gets called on every request
export async function getStaticProps({ params: { blogid } }) {
  // Fetch data from external API
  const result = await db.collection("blogs").doc(blogid).get();
  // console.log(result.data());
  // comments
  const allCommetsSnap = await db
    .collection("blogs")
    .doc(blogid)
    .collection("comments")
    .get();
  const allComments = allCommetsSnap.docs.map((comDocSnap) =>
    comDocSnap.data()
  );

  // Pass data to the page via props
  return {
    props: {
      blog: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis(),
      },
      allComments,
    },

    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
