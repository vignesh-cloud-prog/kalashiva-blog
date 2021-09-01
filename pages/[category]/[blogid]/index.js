// React related

import { useEffect, useState, useContext } from "react";

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
  FormGroup,
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
import UserContext from "../../../store/user_context";
// Firebase
import { db, serverTimeStamp, increment } from "../../../firebase/firebase";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

export default function BlogDetails({ blogDetails, blogBody, allComments }) {
  // Checking Amin for providing special functionality
  const userContext = useContext(UserContext);
  const { user } = userContext;
  let userEmail;
  if (user != null) userEmail = user["email"];

  const toolStyle = { display: "none" };
  const [comment, setComment] = useState("");
  const [comments, setAllComments] = useState(allComments);

  const data = useContext(MessageContext);
  const { addMessage } = data;

  const router = useRouter();
  const { blogid, category } = router.query;

  const incrementViewCount = () => {
    // Document reference
    const blogRef = db.collection("blogdetails").doc(blogid);

    // Update read count
    blogRef.update({ viewCount: increment });
  };

  useEffect(() => {
    incrementViewCount();
  }, []);
  const makeComment = async () => {
    // Function make comments by user related to post
    try {
      await db
        .collection("blogdetails")
        .doc(blogid)
        .collection("comments")
        .add({
          text: comment,
          name: user.displayName,
          commentedAt: serverTimeStamp(),
          photo: user.photoURL,
        });
      const commentQuery = await db
        .collection("blogdetails")
        .doc(blogid)
        .collection("comments")
        .get();
      setAllComments(
        commentQuery.docs.map((docSnap) => ({
          ...docSnap.data(),
          commentedAt: docSnap.data().commentedAt.toMillis(),
          id: docSnap.id,
        }))
      );
      addMessage(`Your comment added`, "success");
    } catch (error) {
      addMessage(error.message, "error");
    }
    setComment("");
  };

  return (
    <Container maxWidth="md">
      <Head>
        <title>{`${blogDetails.title} | kaalashiva`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${blogDetails.desc}`} />
      </Head>
      <h1>{blogDetails.title}</h1>
      <h5>created on - {new Date(blogDetails.createdAt).toDateString()}</h5>
      <div style={{ position: "relative", height: "10rem", width: "100%", margin:"auto" }}>
        <Image  layout="fill" src={blogDetails.imageURL} alt="image" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: blogBody.blogBody }}></div>
      <Typography variant="h5">{`Comments(${comments?.length})`}</Typography>
      {user ? (
        <>
          <Grid container alignItems="flex-end" justifyContent="center">
            <Grid container justifyContent="center"  md={1} xs={2}>
              <Avatar alt={user?.displayName} src={user?.photoURL} />
            </Grid>
            <Grid item md={11} xs={10} >
            
            <TextField
                fullWidth
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
                <Grid container spacing={1} alignItems="flex-end" key={cmt.id}>
                  <Grid item style={{ margin: "0.5rem" }}>
                    <Avatar alt={user?.name} src={cmt?.photo} />
                  </Grid>
                  <Grid item >
                    
                    <Typography variant="h6">
                      {`${cmt?.name}  `}
                      <small>

                      <ReactTimeAgo date={cmt?.commentedAt} locale="en-US" />
                      </small>
                    </Typography>
                    <Typography variant="body1">{cmt?.text}</Typography>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </div>
      ) : (
        <p>No comments yet</p>
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

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts

//   const querySnap = await db.collection("blogs").get();
//   const posts = querySnap.docs.map((docSnap) => {
//     return {
//       ...docSnap.data(),
//       id: docSnap.id,
//     };
//   });
//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { category: post.category, blogid: post.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// This gets called on every request
export async function getServerSideProps({ params: { blogid } }) {
  // Fetch data from external API
  const blogDeatails = await db.collection("blogdetails").doc(blogid).get();
  const blogBody = await db.collection("blogbody").doc(blogid).get();
  // console.log(blogDeatails.data());
  // comments
  const allCommetsSnap = await db
    .collection("blogdetails")
    .doc(blogid)
    .collection("comments")
    .get();
  const allComments = allCommetsSnap.docs.map((comDocSnap) => ({
    ...comDocSnap.data(),
    commentedAt: comDocSnap.data().commentedAt.toMillis(),
    id: comDocSnap.id,
  }));

  // Pass data to the page via props
  return {
    props: {
      blogDetails: {
        ...blogDeatails.data(),
        createdAt: blogDeatails.data().createdAt.toMillis(),
      },
      blogBody: blogBody.data(),
      allComments,
    },
  };
}
