import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  field: {
    marginBottom: 20,
  },
  md:{
    margin:theme.spacing(2)
  },
  alert: {
    width: "100%",
  },
 
  expand: {
    
    marginLeft: 'auto',
   
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
    height: 140,
  },
}));

export default useStyles;
