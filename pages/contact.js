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
   <style>
@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
</style>
       <center><Card  style={{padding: '1em', fontFamily: 'Architects Daughter, cursive'}}>
     <p style={{fontSize: '1.3em', fontWeight: 500}}> If you have any questions or concerns, please do not hesitate to contact us.<br></br><br></br> <strong style={{fontSize: '1.1em'}}>We are always here to help you</strong></p>
     <br></br>
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'spaceAround'}}>
  
  

      <div><Link href="https://github.com/murai1998" ><GitHubIcon fontSize="large"/></Link></div>
     
      <div style={{marginLeft: '1em'}}><Link style={{marginLeft: '3em !important'}} href="https://www.linkedin.com/in/hmurai"><LinkedInIcon fontSize="large"  color="primary" /></Link></div>
    </div>
   
    </Card></center>
    </Layout>
  )
}
