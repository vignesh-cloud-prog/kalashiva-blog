import { alpha, makeStyles } from "@material-ui/core/styles";

const blogDetailsStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("lg")]: {
      marginBottom:"12vh",
     
    },
  },
}));

export default blogDetailsStyles;
