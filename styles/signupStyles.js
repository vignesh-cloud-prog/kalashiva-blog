import { makeStyles } from "@material-ui/core/styles";

const SignupStyle = makeStyles((theme) => ({
  padd: {
    padding:theme.spacing(4),
    flexGrow: 1,
    paddingBottom:0
  },
  mb:{
      marginBottom:theme.spacing(2)
  },
  field: {
    marginBottom: 10,
  },
  
}));

export default SignupStyle;
