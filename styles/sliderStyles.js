import { makeStyles } from "@material-ui/core/styles";

const sliderStyles = makeStyles((theme) => ({
  root: {
    marginTop:theme.spacing(2),
    flexGrow: 1,
  },
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
    position: "relative",
    height: "10rem",
    width: "100%",
  },
}));

export default sliderStyles;
