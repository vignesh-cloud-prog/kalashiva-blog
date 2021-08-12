import React from "react";
import dynamic from "next/dynamic";
import { db, serverTimeStamp } from "../../../firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { convertFromRaw, EditorState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import Alerts from "../../../components/Main/alerts";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

export default function BlogDetails({ blog, user, allComments }) {
  const toolStyle = { display: "none" };
  const [comment, setComment] = useState("");
  const [comments, setAllComments] = useState(allComments);
  const { title, body, imgURL, createdAt, desc, category } = blog;

  const contentState = convertFromRaw(blog.body);
  const content = EditorState.createWithContent(contentState);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const router = useRouter();
  const { blogid } = router.query;
  const makeComment = async () => {
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
      setMessage(`comment added`);
      setSeverity("success");
      setShowMessage(true);
    } catch (error) {
      setMessage(err.message);
      setSeverity("error");
      setShowMessage(true);
    }
    setComment("");
  };

  return (
    <Container>
      {showMessage ? <Alerts message={message} type={severity} /> : <></>}
      <h1>{blog.title}</h1>
      <h5>created on - {new Date(blog.createdAt).toDateString()}</h5>
      <Image width="800" height="90" src={blog.imageURL} alt="image" />
      <Editor
        editorState={content}
        readOnly={true}
        toolbar={{
          options: [],
        }}
      />
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
          <Link href="\login">
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
                  
                  <Grid item style={{margin:"0.5rem"}}>
                    <Avatar alt={user?.name} src={cmt?.photo} />
                  </Grid>
                  <Grid item style={{margin:"0.5rem"}}>
                    <Typography variant="h6">{cmt?.name} 
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
    </Container>
  );
}

// This gets called on every request
export async function getServerSideProps({ params: { blogid, category } }) {
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
  };
}
