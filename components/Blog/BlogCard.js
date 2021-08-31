import React, { useContext, useEffect, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import Link from "next/link";
import useStyles from "../../styles/usestyles";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
import { Button, Grid } from "@material-ui/core";
import {
  BookmarkBorderOutlined,
  LibraryAddOutlined,
  ShareOutlined,
} from "@material-ui/icons";

import ShareContext from "../../store/share_context";
import MessageContext from "../../store/message_context";
import UserContext from "../../store/user_context";
import { useState } from "react";
import {
  addToCollection,
  addToReadLater,
  removeFromCollection,
  removeFromReadLater,
} from "../helperFunc/userData";

export default function BlogCard({
  id,
  title,
  desc,
  createdAt,
  image,
  category,
}) {
  const data = useContext(ShareContext);
  const { addToShare } = data;

  const messenger = useContext(MessageContext);
  const { addMessage } = messenger;

  const userContext = useContext(UserContext);
  const { user, userCollection, userReadLater, updateUserDataChanged } =
    userContext;

  const [shareData, setShareData] = useState({});
  function isIdInArray(id, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === id) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    setShareData({
      url: `${window.location.protocol}//${window.location.hostname}/${category}/${id}`,
      title: `${title}`,
      summary: `${desc}`,
      open: true,
    });
  }, []);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card_container} raised>
      <CardHeader
        title={
          <>
            <Grid container>
              <Grid item xs={9}>
                <Typography>{title}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container justifyContent="flex-end">
                  <Button
                    className={classes.label}
                    variant="contained"
                    color="secondary"
                    edge="end"
                  >
                    {category}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        }
        subheader={<ReactTimeAgo date={createdAt} locale="en-US" />}
      />

      <CardMedia className={classes.media} image={image} />

      <Link href={`/${category}/${id}`}>
        <a>
          <CardContent>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {desc} <Typography variant="body2">Read more</Typography>
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions disableSpacing>
        {isIdInArray(id, userCollection) ? (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (user) {
                removeFromCollection(user.uid, id).then((res)=>addMessage(res.message,res.status))
                updateUserDataChanged();
              }
            }}
          >
            
            <BookmarkOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (user)
                addToCollection(user.uid, id, title, image).then((res) => {
                  updateUserDataChanged();
                  return addMessage(res.message, res.status);
                });
            }}
          >
            
            <BookmarkBorderOutlined />
          </IconButton>
        )}

        {isIdInArray(id, userReadLater) ? (
          <IconButton
            aria-label="add to read later"
            onClick={() => {
              if (user) {
                removeFromReadLater(user.uid, id).then((res)=>addMessage(res.message,res.status))
                updateUserDataChanged();
              }
            }}
          >
            <LibraryAddCheckIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to bookmark"
            onClick={() => {
              if (user)
                addToReadLater(user.uid, id, title, image).then((res) => {
                  updateUserDataChanged();
                  return addMessage(res.message, res.status);
                });
            }}
          >
            <LibraryAddOutlined />
          </IconButton>
        )}

        <IconButton
          aria-label="share"
          className={classes.expand}
          onClick={() => addToShare(shareData)}
        >
          <ShareOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
