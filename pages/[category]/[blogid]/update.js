import React, { useEffect, useState } from "react";
import { async } from "regenerator-runtime";
import BlogEditor from "../../../components/Blog/blogEditor";
import { db, serverTimeStamp, storage } from "../../../firebase/firebase";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";

export default function UpdateBlog({ blogid }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(() => EditorState.createEmpty());
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [updateBlogState, setupdateBlogState] = useState(false);
  const blog = async () => {
    const cityRef = db.collection("blogs").doc(blogid);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const blogData = doc.data();

      setTitle(blogData.title);
      setBody(EditorState.createWithContent(convertFromRaw(blogData.body)));
      setDesc(blogData.desc);
      setCategory(blogData.category);
      setFeatured(blogData.featured);
      setImage({
        preview: blogData.imageURL,
      });
    }
  };

  useEffect(() => {
    blog();
  }, []);
  let inputState = {
    title,
    body,
    image,
    url,
    desc,
    category,
    featured,
  };
  let inputSetState = {
    setTitle,
    setBody,
    setImage,
    setUrl,
    setDesc,
    setCategory,
    setFeatured,
  };

  let messageState = {
    message,
    setMessage,
    severity,
    setSeverity,
    showMessage,
    setShowMessage,
  };
  let blogfields = {
    title,
    body: convertToRaw(body.getCurrentContent()),
    desc,
    category: category,
    featured: featured,
    imageURL: image.preview,
  };
  const updateBlog = async () => {
    try {
      await db.collection("blogs").doc(blogid).set(blogfields, { merge: true });

      setMessage(`Blog updated successfully`);
      setSeverity("success");
      setShowMessage(true);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setSeverity("error");
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (url) {
      blogfields.imageURL = url;
    }
    if (updateBlogState) {
      updateBlog();
      setupdateBlogState(false);
    }
  }, [updateBlogState, url]);

  const submitDetails = (e) => {
    e.preventDefault();

    if (title || body || slug) {
      if (image.raw) {
        var uploadTask = storage
          .ref()
          .child(`images/${uuidv4()}`)
          .put(image.raw);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            if (progress == 100) setMessage(`Image uploaded`);
            setSeverity("success");
            setShowMessage(true);
          },
          (error) => {
            setMessage(error.message);
            setSeverity("error");
            setShowMessage(true);
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              setUrl(downloadURL);
            });
          }
        );
      }
      setupdateBlogState(true);
    } else {
      setMessage("Please enter all the fields");
      setSeverity("warning");
      setShowMessage(true);
    }
  };
  return (
    <div>
      <h1>Blog update page</h1>
      <BlogEditor
        inputStats={inputState}
        inputSetState={inputSetState}
        messageState={messageState}
        submitDetails={submitDetails}
      ></BlogEditor>
    </div>
  );
}

export async function getServerSideProps({ params: { blogid } }) {
  // Create a reference to the blogsF collection

  return {
    props: { blogid }, // will be passed to the page component as props
  };
}
