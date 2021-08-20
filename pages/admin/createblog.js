import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { db, serverTimeStamp, storage } from "../../firebase/firebase";
import useStyles from "../../styles/usestyles";
import BlogEditor from "../../components/Blog/blogEditor";

export default function CreateBlog({ user }) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState(() => EditorState.createEmpty());
  const [image, setImage] = useState({ preview: "", raw: null });
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  let inputState = {
    title,
    body,
    image,
    url,
    desc,
    category,
    featured,
    published,
  };
  let inputSetState = {
    setTitle,
    setBody,
    setImage,
    setUrl,
    setDesc,
    setCategory,
    setFeatured,
    setPublished,
  };

  let messageState = {
    message,
    setMessage,
    severity,
    setSeverity,
    showMessage,
    setShowMessage,
  };

  useEffect(() => {
    if (url) {
      const blogdata = {
        title,
        body: convertToRaw(body.getCurrentContent()),
        desc,
        category: category,
        featured: featured,
        published:published,
        imageURL: url,
        postedBy: user?.displayName,
        createdAt: serverTimeStamp(),
      };

      db.collection("blogs")
        .add(blogdata)
        .then(() => {
          setMessage(`Blog created`);
          setSeverity("success");
          setShowMessage(true);
        })
        .catch((error) => {
          setMessage(error.message);
          setSeverity("error");
          setShowMessage(true);
        });
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
      <BlogEditor
        inputStats={inputState}
        inputSetState={inputSetState}
        messageState={messageState}
        submitDetails={submitDetails}
      ></BlogEditor>
    </div>
  );
}
