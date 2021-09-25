import React, { useContext } from "react";
import Image from "next/image";
import MessageContext from "../../store/message_context";
import styles from "../../styles/Share.module.css";
export default function ShareFixedBottom({ url, title, summary }) {
  const messages = useContext(MessageContext);
  const { addMessage } = messages;
  const copyText = () => {
    var text = url;
    navigator.clipboard.writeText(text).then(
      function () {
        addMessage("copied", "success");
      },
      function (err) {
        addMessage(err, "error");
      }
    );
  };
  const socials = [
    {
      name: "whatsapp",
      file: "socials/whatsapp.png",
      link: `https://api.whatsapp.com/send?text=${url} ${title}  ${summary}`,
    },
    {
      name: "facebook",
      file: "socials/facebook.png",
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "instagram",
      file: "socials/instagram.png",
      link: `https://www.instagram.com/?url=${url}`,
    },
    {
      name: "linkedin",
      file: "socials/linkedin.png",
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}&source=kaalashiva.com`,
    },
    {
      name: "mail",
      file: "socials/mail.png",
      link: `mailto:?subject=${title}&body=${url}
          ${summary}`,
    },
    {
      name: "telegram",
      file: "socials/telegram.png",
      link: `https://t.me/share/url?text=${title}&url=${url}`,
    },
    {
      name: "twitter",
      file: "socials/twitter.png",
      link: `https://twitter.com/intent/tweet?text=${url} ${title}`,
    },
  ];
  return (
    <div className={styles.shareContainer}>
      <Image
        onClick={() => copyText()}
        src={`/icons/socials/copy.png`}
        alt={`copy-icon`}
        width="60px"
        height="60px"
      />
      {/* <Typography align="center">copy</Typography> */}

      {socials.map((social) => (
        <div key={socials.link}>
          <a href={social.link}>
            <Image
              src={`/icons/${social.file}`}
              alt={`${social.name}-icon`}
              width="60px"
              height="60px"
            />
            {/* <Typography align="center">{social.name}</Typography> */}
          </a>
        </div>
      ))}
    </div>
  );
}
