import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage,db,serverTimeStamp } from "../firebase";

export default function CreateBlog({user}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(()=>{
    if(url)
    {
      try{
      db.collection('blogs').add(
        {
        title,
        body,
        imageURL:url,
        postedBy:user.uid,
        createdAt:serverTimeStamp()

        }
      )
      M.toast({ html: `Blog created`, classes: "green" });
      }catch(error){
        M.toast({ html: `Error occured - ${error.message}`, classes: "red" });
      }
    }
  },[url])

  const submitDetails = (e) => {
    if (title || body || image) {
      var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          if (progress == 100)
            M.toast({ html: `Image uploaded`, classes: "green" });

          
        },
        (error) => {
          M.toast({ html: `${error.message}`, classes: "red" });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    } else {
      M.toast({ html: `Please add all the fields`, classes: "red" });
    }
  };

  return (
    <div className="input-field rootdiv">
      <h1>Create a Blog</h1>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        value={body}
        placeholder="Title"
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        type="submit"
        className="#311b92 deep-purple darken-4 btn"
        onClick={(e) => submitDetails(e)}
      >
        Create
      </button>

      <style jsx>{`
        .rootdiv {
          margin: 30px auto;
          max-width: 600px;
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
