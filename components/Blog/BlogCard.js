import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ShareIcon from "@material-ui/icons/Share";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentIcon from "@material-ui/icons/Comment";
import Link from "next/link";
import useStyles from "../../styles/usestyles";
import ReactTimeAgo from "react-time-ago";
import { Button, Grid } from "@material-ui/core";
import {
  BookmarkBorderOutlined,
  Category,
  LibraryAddCheckOutlined,
  LibraryAddOutlined,
  ShareOutlined,
} from "@material-ui/icons";

export default function BlogCard({
  id,
  slug,
  title,
  desc,
  createdAt,
  image,
  catergory,
}) {
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
                    {catergory}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        }
        subheader={<ReactTimeAgo date={createdAt} locale="en-US" />}
      />

      <CardMedia className={classes.media} image={image} />

      <Link href={`/${catergory}/${id}`}>
        <a>
          <CardContent>
            <Typography noWrap variant="body2" color="textSecondary" component="p">
              {desc} <Typography variant="body2">Read more</Typography>
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <BookmarkBorderOutlined />
        </IconButton>
        <IconButton aria-label="share">
          <LibraryAddOutlined />
        </IconButton>

        <IconButton aria-label="share" className={classes.expand}>
          <ShareOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
