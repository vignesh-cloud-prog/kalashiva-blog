import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, serverTimeStamp, storage } from "../../firebase/firebase";
import useStyles from "../../styles/usestyles";
import BlogEditor from "../../components/Blog/blogEditor";

export default function CreateBlog({ user }) {
  const classes = useStyles();
  const [blogInfo, setBlogInfo] = useState({
    title: "",

    desc: "",
    category: "",
    featured: false,
    url: null,
    published: false,
  });

  const [blogBody, setBlogBody] = useState("create awesome blog");
  const [image, setImage] = useState({ preview: "", raw: null });

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  let messageState = {
    message,
    setMessage,
    severity,
    setSeverity,
    showMessage,
    setShowMessage,
  };

  // body: convertToRaw(body.getCurrentContent()),
  useEffect(() => {
    if (blogInfo.url) {
      const blogdata = {
        title: blogInfo.title,
        body: blogBody,
        desc: blogInfo.desc,
        category: blogInfo.category,
        featured: blogInfo.featured,
        published: blogInfo.published,
        imageURL: blogInfo.url,
        postedBy: user?.displayName,
        createdAt: serverTimeStamp(),
        viewCount:0,
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
  }, [blogInfo.url]);

  const submitDetails = (e) => {
    e.preventDefault();
    if (blogInfo.title && blogBody && image) {
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
            setBlogInfo({ ...blogInfo, url: downloadURL });
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
        inputState={blogInfo}
        inputSetState={setBlogInfo}
        messageState={messageState}
        submitDetails={submitDetails}
        setImage={setImage}
        image={image}
        setBlogBody={setBlogBody}
        blogBody={blogBody}
      ></BlogEditor>
    </div>
  );
}
