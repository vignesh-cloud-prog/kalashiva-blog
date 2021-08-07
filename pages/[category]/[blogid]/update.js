import React, { useEffect, useState } from "react";
import { async } from "regenerator-runtime";
import BlogEditor from "../../../components/blogEditor";
import { db, serverTimeStamp, storage } from "../../../firebase/firebase";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";

export default function UpdateBlog({ blogid }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(() => EditorState.createEmpty());
  const [image, setImage] = useState({ preview: "", raw: null });
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const blog = async () => {
    const cityRef = db.collection("blogs").doc(blogid);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data());
      const blogData = doc.data();

      setTitle(blogData.title);
      setBody(EditorState.createWithContent(convertFromRaw(blogData.body)));
      setDesc(blogData.desc);
      setCategory(blogData.catergory);
      setFeatured(blogData.featured);
      setImage({
        preview:blogData.imageURL  
      });
      console.log(blogData.imageURL);
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

  const updateBlog = async () => {
    try {
      await db
        .collection("blogs")
        .doc(blogid)
        .set(
          {
            title,
            body: convertToRaw(body.getCurrentContent()),
            desc,
            catergory: category,
            featured: featured,
            imageURL: url,
          },
          { merge: true }
        );

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
      updateBlog();
    }
  }, [url]);

  const submitDetails = (e) => {
    e.preventDefault();
    if (title || body || image || slug) {
      var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image.raw);
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
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
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
  console.log("props" + blogid);
  // Create a reference to the blogsF collection

  return {
    props: { blogid }, // will be passed to the page component as props
  };
}
