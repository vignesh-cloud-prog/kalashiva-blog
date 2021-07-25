import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertMessage from "../components/alerts";
import { db, serverTimeStamp, storage } from "../firebase/firebase";
import useStyles from "../styles/usestyles";

export default function CreateBlog({ user }) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [showMessage]);

  useEffect(() => {
    if (url) {
      let blogdata = {
        title,
        body,
        desc,
        slug,
        catergory: category,
        featured: featured,
        imageURL: url,
        postedBy: user?.displayName,
        createdAt: serverTimeStamp(),
      }
      
    
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
      var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image);
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
      {showMessage ? <AlertMessage message={message} type={severity} /> : <></>}

      <Container maxWidth="sm">
        <Typography variant="h4" component="h1">
          Add Blog
        </Typography>
        <form onSubmit={(e) => submitDetails(e)}>
          <FormControl noValidate fullWidth>
            <TextField
              required
              className={classes.field}
              type="text"
              label="Title"
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              required
              className={classes.field}
              type="text"
              label="Slug"
              variant="filled"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <Button color="secondary" variant="contained" component="span">
                Add Thumb
              </Button>
            </label>

            <TextField
              required
              className={classes.field}
              multiline
              rows={2}
              maxRows={4}
              label="Description"
              variant="filled"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <FormControl variant="filled">
              <InputLabel id="cate" required>
                Category
              </InputLabel>

              <Select
                label="Category"
                labelId="cate"
                id="demo-simple-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Story">story</MenuItem>
                <MenuItem value="Poetry">poetry</MenuItem>
                <MenuItem value="Novel">novel</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  value={featured}
                  onChange={() => setFeatured(true)}
                />
              }
              label="featured"
              labelPlacement="start"
            />
            <TextField
              required
              className={classes.field}
              multiline
              rows={5}
              maxRows={12}
              label="Body"
              variant="filled"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <Button variant="contained" color="primary" type="submit">
              create blog
            </Button>
          </FormControl>
        </form>
      </Container>
    </div>
  );
}
