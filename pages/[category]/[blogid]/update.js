// React related
import React, { useEffect, useState, useContext } from "react";

// Next related
import { useRouter } from "next/router";

// Components
import BlogEditor from "../../../components/Blog/blogEditor";

// UUID
import { v4 as uuidv4 } from "uuid";

//  Firebase
import { db, serverTimeStamp, storage } from "../../../firebase/firebase";

import MessageContext from "../../../store/message_context";

export default function UpdateBlog({ blog, blogid }) {
  const [blogInfo, setBlogInfo] = useState({
    title: blog.title,

    desc: blog.desc,
    category: blog.category,
    featured: blog.featured,
    url: null,
    published: blog.published,
  });

  const [blogBody, setBlogBody] = useState(blog.body);
  const [image, setImage] = useState({ preview: blog.imageURL, raw: "" });

  const data = useContext(MessageContext);
  const { addMessage } = data;

  const [updateBlogState, setupdateBlogState] = useState(false);

  // Data object passed while updating
  let blogfields = {
    title: blogInfo.title,
    body: blogBody,
    desc: blogInfo.desc,
    category: blogInfo.category,
    featured: blogInfo.featured,
    published: blogInfo.published,
    imageURL: image.preview,
  };

  // This fuction updates the blog
  const updateBlog = async () => {
    console.log(blogfields);
    try {
      await db.collection("blogs").doc(blogid).set(blogfields, { merge: true });
      addMessage(`Blog updated successfully`, "success");
    } catch (error) {
      addMessage(error.message, "error");
    }
  };

  useEffect(() => {
    // Checking whether blog thumb image updated
    if (blogInfo.url) {
      blogfields.imageURL = blogInfo.url;
    }
    if (updateBlogState) {
      updateBlog();
      setupdateBlogState(false);
    }
  }, [updateBlogState, blogInfo.url]);

  // Handling the blog submit update
  const submitDetails = (e) => {
    e.preventDefault();

    if (blogInfo.title != "" && blogBody != "") {
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
            if (progress == 100) addMessage(`Image uploaded`, "success");
          },
          (error) => {
            addMessage(error.message, "error");

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
              setBlogInfo({ ...blogInfo, url: downloadURL });
            });
          }
        );
      }
      setupdateBlogState(true);
    } else {
      addMessage("Please enter all the fields", "warning");
    }
  };

  return (
    <div>
      <h1>Blog update page</h1>
      <BlogEditor
        inputState={blogInfo}
        inputSetState={setBlogInfo}
        submitDetails={submitDetails}
        setImage={setImage}
        image={image}
        setBlogBody={setBlogBody}
        blogBody={blogBody}
      ></BlogEditor>
    </div>
  );
}

export async function getServerSideProps({ params: { blogid } }) {
  // Create a reference to the blogsF collection
  const result = await db.collection("blogs").doc(blogid).get();
  return {
    props: {
      blog: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis(),
      },
      blogid,
    }, // will be passed to the page component as props
  };
}
