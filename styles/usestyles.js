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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    
    marginLeft: 'auto',
   
  },
}));

export default useStyles;
