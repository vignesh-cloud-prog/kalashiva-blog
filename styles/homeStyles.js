import { makeStyles } from "@material-ui/core/styles";

const homeStyles = makeStyles((theme) => ({

  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
 
  media: {
    height: 140,
  },
<<<<<<< HEAD
  wrapper: {
    marginTop: theme.spacing(2),
    position: 'relative',
  },
=======
>>>>>>> 9b9be2ed83286c9bf263454ec9ac45a0c0314a4f
}));

export default homeStyles;
