import Layout from '../components/layout'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader"; 
import Link from 'next/link'

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
     <p style={{fontSize: '1.2em', fontWeight: 500}}> If you have any questions or concerns, please do not hesitate to contact us.<br></br> We are always happy to help you</p>
     <br></br>
     <div >
   <p style={{color: 'rgba(0, 0, 0, 0.54)', fontWeight: 700}}>You can find us here:</p>
  
   <div  className={classes.root}>
      <Link href="https://github.com/murai1998" ><GitHubIcon fontSize="large"/></Link>
      <Link style={{marginLeft: '1em !important'}} href="https://www.linkedin.com/in/hmurai"><LinkedInIcon fontSize="large"  color="primary" /></Link>
    </div>
    </div>
    </Card></center>
    </Layout>
  )
}
