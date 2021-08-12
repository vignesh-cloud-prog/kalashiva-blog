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
import { Button } from "@material-ui/core";
import { Category } from "@material-ui/icons";

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
    <Card className={classes.root} raised>
      <CardHeader
        title={
          <>
            {title}
            <Button
              className={classes.md}
              variant="contained"
              color="secondary"
              edge="end"

            >
              {catergory}
            </Button>
          </>
        }
        subheader={<ReactTimeAgo date={createdAt} locale="en-US" />}
      />

      <CardMedia className={classes.media} image={image} />

      <Link href={`/${catergory}/${id}`}>
            <a>
          
        <CardContent >
          <Typography variant="body2" color="textSecondary" component="p">
            {desc} <Typography variant="body2">Read more</Typography>
          </Typography>
        </CardContent>
        </a>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share"></IconButton>
        <Typography className={classes.expand} variant="h6">
          {`200 views`}
        </Typography>
      </CardActions>
    </Card>
  );
}
