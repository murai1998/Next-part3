import Layout from '../components/layout'

import { signIn, signOut, useSession } from 'next-auth/client'



import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { AutoComplete } from 'antd';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
     
        NextStep
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
backgroundImage: 'url(https://images.unsplash.com/photo-1607175589389-eded55c33441?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
   
  },
  paper: {
margin: theme.spacing(10, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   

    
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
     // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  part2: {
    margin: 'auto'
  }
}));




export default function Page() {
  const [session, loading] = useSession()
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
        
      {!session && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: 'auto'}}>
          {/* Not signed in <br />
          <button onClick={signIn}>Sign in</button> */}

<Grid container component="main" className={classes.root}>

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div  className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signIn}
            >
              Sign In
            </Button>
          
           <Card>
           <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
          Next{bull}Step
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
         app
        </Typography>
        <Typography style={{paddingTop: '1em'}} variant="body2" component="div">
        {bull} Great tool to build online surveys
          <br />
          <br/>
          <Typography align='center' className={classes.pos} color="textSecondary">
 {'REALIABLE, FAST, FREE'}
        </Typography>
        
          <br/>
        <center>  {bull} Place to find respondents for the surveys</center>
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
           </Card>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  

     </div>
      )}


 {session && (
      
         <Layout>
                <style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
</style>
          <p style={{paddingTop: "2em", fontSize: '1.8em', textAlign: 'center', color: '#f50057', fontFamily: 'Architects Daughter, cursive' }}>Hello, {session.user.name}. Thank you for joining us. </p>
          <p style={{fontSize: '1.2em', textAlign: 'center',   }}><span style={{fontFamily: 'Architects Daughter, cursive', fontSize: '1.4em'}}>Creating forms and surveys never seems easier than with <span style={{color: "rgb(63, 81, 181)", fontWeight: 700}}>NextStep</span>.</span><br></br><br></br> Our app gives you the ability to complete a variety of different tasks within a couple of clicks for free. No matter what browser you use or how complex your form is, NextStep is here to help you!</p>
          </Layout>
         
      )} 


      
 </>
  )
}






