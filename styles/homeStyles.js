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
}));

export default homeStyles;
