import React, { useContext } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Image from "next/image";
import ShareContext from "../../store/share_context";
import MessageContext from "../../store/message_context";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Icons from here https://icons8.com/icon/set/linkedin/color
export default function Share() {
  const messages = useContext(MessageContext)
  const {addMessage}=messages

  const data = useContext(ShareContext);

  const { url, title, summary, open } = data.share;
  const { removeFromShre } = data;

  const copyText = () => {
    var text = url;
    navigator.clipboard.writeText(text).then(
      function () {
        addMessage("copied","success")
        removeFromShre({ open: false });
      },
      function (err) {
        addMessage(err,"error")
       
      }
    );
  };

  const socials = [
    {
      name: "whatsapp",
      file: "whatsapp.gif",
      link: `https://api.whatsapp.com/send?text=${url} ${title}  ${summary}`,
    },
    {
      name: "facebook",
      file: "facebook.gif",
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "instagram",
      file: "instagram.gif",
      link: `https://www.instagram.com/?url=${url}`,
    },
    {
      name: "linkedin",
      file: "linkedin.gif",
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}&source=kaalashiva.com`,
    },
    {
      name: "mail",
      file: "mail.gif",
      link: `mailto:?subject=${title}&body=${url}
      ${summary}`,
    },
    {
      name: "telegram",
      file: "telegram.gif",
      link: `https://t.me/share/url?text=${title}&url=${url}`,
    },
    {
      name: "twitter",
      file: "twitter.gif",
      link: `https://twitter.com/intent/tweet?text=${url} ${title}`,
    },
  ];
  const handleClose = () => {
    removeFromShre({ open: false });
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Share now</Typography>

            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogActions>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <Image
                onClick={() => copyText()}
                src={`/icons/copy.gif`}
                alt={`copy-icon`}
                layout="responsive"
                width="5vw"
                height="5vh"
              />
              <Typography align="center">copy</Typography>
            </Grid>
            {socials.map((social) => (
              <Grid item xs={3} key={social.name}>
                <a href={social.link}>
                  <Image
                    src={`/icons/${social.file}`}
                    alt={`${social.name}-icon`}
                    layout="responsive"
                    width="5vw"
                    height="5vh"
                  />
                  <Typography align="center">{social.name}</Typography>
                </a>
              </Grid>
            ))}
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// # TWITTER_ENDPOINT = 'https://twitter.com/intent/tweet?text=%s'
// # FACEBOOK_ENDPOINT = 'https://www.facebook.com/sharer/sharer.php?u=%s'
// # GPLUS_ENDPOINT = 'https://plus.google.com/share?url=%s'
// # MAIL_ENDPOINT = 'mailto:?subject=%s&body=%s'
// # LINKEDIN_ENDPOINT = 'https://www.linkedin.com/shareArticle?mini=true&title=%s&url=%s'
// # REDDIT_ENDPOINT = 'https://www.reddit.com/submit?title=%s&url=%s'
// # TELEGRAM_ENDPOINT = 'https://t.me/share/url?text=%s&url=%s'
// # WHATSAPP_ENDPOINT = 'https://api.whatsapp.com/send?text=%s'
