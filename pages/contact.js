import Layout from '../components/layout'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader"; 


const useStyles = makeStyles((theme) => ({
    root: {
      '& > svg': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function Page () {
    const classes = useStyles();
  return (
    <Layout>
       <center><Card style={{padding: '1em'}}>
     <p style={{fontSize: '1.2em'}}> If you have any questions or concerns, please do not hesitate to contact us.<br></br> We are here to help you</p>
     <br></br>
   <p>You can find us here:</p>
  
   <div className={classes.root}>
      <GitHubIcon fontSize="large"/>
      <LinkedInIcon fontSize="large"  color="primary" />
    </div>
    </Card></center>
    </Layout>
  )
}
