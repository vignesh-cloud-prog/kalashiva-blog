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
  Grid,
  ButtonGroup,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";

import useStyles from "../../styles/usestyles";

import { CKEditor } from "ckeditor4-react";
import { removeBlog } from "../helperFunc/deleteBlog";

import MessageContext from "../../store/message_context";
import router from "next/router";

export default function BlogEditor({
  name = "create",
  inputState,
  inputSetState,
  blogBody,
  setBlogBody,
  image,
  setImage,
  submitDetails,
  update = false,
  blogId = null,
}) {
  const categories = [
    "ಲೇಖನ",
    "ಕಥೆ",
    "ಕವಿತೆ",
    "ಅಧ್ಯಾತ್ಮ",
    "ಸುದ್ದಿ",
    "ಕ್ರೀಡೆ",
    "ತಂತ್ರಜ್ಞಾನ",
    "ಸಿನೆಮಾ",
  ];
  // let editor= CKEDITOR.instances.blog_editor
  // editor.setData(blogBody)
  const classes = useStyles();

  const data = useContext(MessageContext);
  const { addMessage } = data;
  const { featured, category, desc, url, body, title, slug, published } =
    inputState;

  return (
    <div>
      <Container width="md">
        <FormControl fullWidth>
          <TextField
            margin="normal"
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
          <TextField
            margin="normal"
            required
            className={classes.field}
            type="text"
            label="Slug"
            variant="outlined"
            value={slug}
            name="slug"
            onChange={(e) =>
              inputSetState({ ...inputState, slug: e.target.value })
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
            margin="normal"
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
            <InputLabel margin="normal" id="cate" required>
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
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
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
        </FormControl>
        <Grid container>
          <Grid item xs={3}>
            {update ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  if (confirm("Are you sure do you want delete the blog")) {
                    let removed = removeBlog(blogId);
                    router.push("/");
                    if (removed) return addMessage("Blog deleted", "success");
                  }
                }}
              >
                delete
              </Button>
            ) : null}
          </Grid>
          <Grid container xs={9} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => submitDetails()}
              color="primary"
              type="submit"
            >
              {name}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
