import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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

export default function BlogCard({
  id,
  title,
  desc,
  createdAt,
  image,
  category,
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
