// React related
import React, { useEffect, useState } from "react";

// Next related
import { useRouter } from "next/router";

// Components
import BlogEditor from "../../../components/Blog/blogEditor";

// Draft js related
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

// UUID
import { v4 as uuidv4 } from "uuid";

//  Firebase
import { db, serverTimeStamp, storage } from "../../../firebase/firebase";

export default function UpdateBlog() {
  const router = useRouter();
  const { blogid } = router.query;

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

  // function retives the actual data to update current blog
  const blog = async () => {
    // Fetching blog data
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

  // Data object passed while updating
  let blogfields = {
    title,
    body: convertToRaw(body.getCurrentContent()),
    desc,
    category: category,
    featured: featured,
    imageURL: image.preview,
  };

  // This fuction updates the blog
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
    // Checking whether blog thumb image updated
    if (url) {
      blogfields.imageURL = url;
    }
    if (updateBlogState) {
      updateBlog();
      setupdateBlogState(false);
    }
  }, [updateBlogState, url]);

  // Handling the blog submit update
  const submitDetails = (e) => {
    e.preventDefault();

    if (title || body || slug) {
      // If new thumb image then upload it firebase storage
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
