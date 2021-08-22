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
import React, { useEffect, useRef, useState } from "react";

import Alerts from "../Main/alerts";
import useStyles from "../../styles/usestyles";

import { CKEditor } from "ckeditor4-react";

export default function BlogEditor({
  inputState,
  inputSetState,
  blogBody,
  setBlogBody,
  image,
  setImage,
  submitDetails,
}) {
  // let editor= CKEDITOR.instances.blog_editor
  // editor.setData(blogBody)
  const classes = useStyles();

  const { featured, category, desc, url, body, title, published } = inputState;

  

  return (
    <div>

      <Container width="md">
        <Typography variant="h4" component="h1">
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
              name="title"
              onChange={(e) =>
                inputSetState({ ...inputState, title: e.target.value })
              }
            />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) =>
                  setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0],
                  })
                }
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
              label="Description"
              variant="outlined"
              value={desc}
              name="desc"
              onChange={(e) =>
                inputSetState({ ...inputState, desc: e.target.value })
              }
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
                name="category"
                onChange={(e) =>
                  inputSetState({ ...inputState, category: e.target.value })
                }
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
                  checked={featured}
                  name="featured"
                  onChange={(e) =>
                    inputSetState({ ...inputState, featured: e.target.checked })
                  }
                />
              }
              label="featured"
              labelPlacement="start"
            />

            <CKEditor
              name="body"
              initData={blogBody}
              onInstanceReady={(e) => {
                console.log("we are ready");
              }}
              data={blogBody}
              onChange={(e) => setBlogBody(e.editor.getData())}
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={published}
                  name="published"
                  onChange={(e) =>
                    inputSetState({
                      ...inputState,
                      published: e.target.checked,
                    })
                  }
                />
              }
              label="Is it ready to publish"
              labelPlacement="start"
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
