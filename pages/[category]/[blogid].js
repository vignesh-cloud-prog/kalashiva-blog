import React from "react";
import dynamic from "next/dynamic";
import { db } from "../../firebase/firebase";
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
import styles from "../../styles/Home.module.css";



export default function BlogDetails({ blog, user, allComments }) {
  const toolStyle={display:"none" }
  const [comment, setComment] = useState("");
  const [comments, setAllComments] = useState(allComments);
  const {title,body,imgURL,createdAt,desc,category}=blog

  const contentState = convertFromRaw(blog.body);
    const content = EditorState.createWithContent(contentState);
  
  const router = useRouter();
  const { blogid } = router.query;
  const makeComment = async () => {
    try {
      await db.collection("blogs").doc(blogid).collection("comments").add({
        text: comment,
        name: user.displayName,
      });
      const commentQuery = await db
        .collection("blogs")
        .doc(blogid)
        .collection("comments")
        .get();
      setAllComments(commentQuery.docs.map((docSnap) => docSnap.data()));
      M.toast({ html: `comment added`, classes: "green" });
    } catch (error) {
      M.toast({ html: `${error.message}`, classes: "red" });
    }
  };

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <h5>created on - {new Date(blog.createdAt).toDateString()}</h5>
      <Image width="800" height="90" src={blog.imageURL} alt="image" />
      <Editor editorState={content} readOnly={true} toolbar={{
        options: [],
  
    }}/>
      {user ? (
        <>
          <div className="input-field">
            <input
              type="text"
              value={comment}
              id=" "
              placeholder="add comment"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="#311b92 deep-purple darken-4 btn"
            onClick={() => makeComment()}
          >
            Comment
          </button>
        </>
      ) : (
        <>Please login to make comment</>
      )}

      <hr />
      <div className="left-align">
        {comments.length != 0 ? (
          <div>
            {comments.map((cmt) => {
              return (
                <h6 key={cmt.text}>
                  <span>{cmt.name}:</span>
                  {cmt.text}
                </h6>
              );
            })}
          </div>
        ) : (
          <p>No comments at</p>
        )}
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps({ params: { blogid,category } }) {
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
