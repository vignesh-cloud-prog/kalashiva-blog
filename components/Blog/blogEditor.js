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
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Alerts from "../Main/alerts"
import useStyles from "../../styles/usestyles";
import Image from "next/dist/client/image";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function BlogEditor({
  inputStats,
  inputSetState,
  messageState,
  submitDetails,
}) {
  const classes = useStyles();
  const {
    message,
    severity,
    showMessage,
    setShowMessage,
    setSeverity,
    setMessage,
  } = messageState;
  const { featured, category, desc, url, image, body, title } = inputStats;
  const {
    setTitle,
    setBody,
    setImage,
    setUrl,
    setDesc,
    setCategory,
    setFeatured,
  } = inputSetState;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }, [showMessage]);

  const myLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div>
      {showMessage ? <Alerts message={message} type={severity} /> : <></>}

      <Container>
        <Typography variant="h4" component="h1" >
          Add Blog
        </Typography>
        <form onSubmit={(e) => submitDetails(e)}>
          <FormControl fullWidth>
            <TextField
              required
              className={classes.field}
              type="text"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                })}
              />

              <Button color="secondary" variant="contained" component="span">
                Add Thumb
              </Button>

            </label>
            {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="200" />
        ) : null}
            <TextField
              required
              className={classes.field}
              multiline
              rows={2}
              maxRows={4}
              label="Description"
              variant="outlined"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <FormControl variant="outlined">
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
                <MenuItem value="ಕವಿತೆ">ಕವಿತೆ</MenuItem>
                <MenuItem value="ಕಥೆ">ಕಥೆ</MenuItem>
                <MenuItem value="ಲೇಖನ">ಲೇಖನ</MenuItem>
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
            <div
              style={{
                border: "1px solid black",
                padding: "2px",
                minHeight: "400px",
              }}
            >
              <Editor editorState={body} onEditorStateChange={setBody} />
            </div>{" "}
            <Button variant="contained" color="primary" type="submit">
              create blog
            </Button>
          </FormControl>
        </form>
      </Container>
    </div>
  );
}
