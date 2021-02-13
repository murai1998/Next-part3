import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Layout from '../../../components/layout'
import AccessDenied from '../../../components/access-denied'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link'
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import Card from '@material-ui/core/Card';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RadioGroup from '@material-ui/core/RadioGroup';

const List2 =({handleChange, handleChange2, title, comment, questions, })=>{
console.log(questions)

    return (

<Card >
      <CardHeader
        title={title}
        subheader={comment}
      />
       <form  noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" name="email" label="Enter your email" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  name='full_name' label="Enter your full name" />
      {questions.map(x =>{
             return( <CardContent>
      <InputLabel >
      {x.quest}
                  </InputLabel>
      {(() => {
          switch (x.type) {
            case "one":
          // <RadioGroup aria-label="gender" name="gender1"  onChange={handleChange2}>  
              return x.answer.map((y) => {
                console.log("array of answers", y);
                if (y) {
                  return (
                    <Typography>
                     <FormControlLabel name={x.quest} value={y.option} control={<Radio />} label={y.option} />
        
                              </Typography>
                  );
                } else {
                  return "";
                }
               
              })
             
              
          // </RadioGroup> 
            case "several":
              return x.answer.map((y) => {
              if (y) {
                return (
                  <Typography>
                              <FormControlLabel
            control={<Checkbox checked={y.option} name={x.quest} onChange={handleChange}  />}
            label={y.option}
          />
                            </Typography>
                );
              } else {
                return "";
              }
              });

            case "short":
              return (
                <FormControl>
                  <TextField id="standard-basic" placeholder="Your answer" />
                </FormControl>
              );
            case "long":
              return (
                <FormControl>
                  <TextField fullWidth id="standard-basic" placeholder="Your answer" />
                </FormControl>
              );
            default:
              return <div></div>;
          }
        })()}
     
             </CardContent>)

       })}
    </form>
      <CardMedia
        
        // image="/static/images/cards/paella.jpg"
    
      />
    
      <CardActions disableSpacing>
       
      </CardActions>

   
      
    </Card>
      
    )
   

}


export default function Library ({list}) {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [listIt, setListIt] = useState(list.data)

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgb(241 240 240);',
      color: theme.palette.common.black ,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content

  return (
    <Layout>
      <h1>Your Library</h1>
     
     
    
      
        <List2 handleChange={handleChange} title={listIt.title} comment={listIt.comment} questions={listIt.questions}/>
     
    </Layout>
  )
}


Library.getInitialProps = async({query: {id}})=>{

    const res = await axios.get(`http://localhost:3000/api/changer/${id}`)
    .catch(err=>console.log(err))
        return {list: res.data}
      // return ''
    }