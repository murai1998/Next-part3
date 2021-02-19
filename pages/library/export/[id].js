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
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
const List2 =({handleChange, handleChange2, handleName, handleEmail,  handleSubmit,  title, comment, questions, email, name, errors, newAnswers, showAlert})=>{
console.log(questions)

    return (

<Card >
      <CardHeader
        title={title}
        subheader={comment}
      />
       <form  noValidate autoComplete="off">
      <TextField error={errors.email ? {content: "Please, enter a valid email address", pointing: "below"}:null} id="outlined-basic"  onChange={handleEmail} label="Outlined" variant="outlined" name="email" label="Enter your email" type='email'/>
      <TextField error={errors.name ? {content: "Please, enter your name", pointing: "below"}:null} id="outlined-basic"  onChange={handleName} label="Outlined" variant="outlined"  name='name' label="Enter your full name" />
      {showAlert  ?<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
       <strong>Please, fill out all fields carefully!</strong>
      </Alert> :('')}
    
      {questions.map((x, index) =>{
             return( <CardContent>
      <InputLabel >
      {x.quest}
                  </InputLabel>

                  {x.type === 'one' ? 
                  
                 <RadioGroup  aria-label="gender" name="gender1"  onChange={(e) =>handleChange(e, index, x.quest, x.type)}>  
                 {x.answer.map((y, in2) => {
                console.log("array of answers", y);
                if (y) {
                  return (
                    <Typography>
                     <FormControlLabel name={in2} value={y.option} control={<Radio />} label={y.option} />
        
                              </Typography>
                  );
                } else {
                  return "";
                }
               
              })}
             
              
          </RadioGroup> :('')}
          {x.type === 'several' ? 
      
           x.answer.map((y, in2) => {
            if (y) {
              return (
                <Typography >
                            <FormControlLabel
          control={<Checkbox defaultValue={false} name={in2} onChange={(e) =>handleChange2(e, index, x.quest, x.type)}  />}
          label={y.option}
        />
                          </Typography>
              );
            } else {
              return "";
            }
            }) : ('')
        
        }

{x.type === 'short' ? 
       <FormControl>
       <TextField onChange={(e) =>handleChange(e, index, x.quest, x.type)} id="standard-basic" placeholder="Your answer" />
     </FormControl>
     :('')}
      {x.type === 'long' ? 
       <FormControl>
       <TextField fullWidth onChange={(e) =>handleChange(e, index, x.quest, x.type)} id="standard-basic" placeholder="Your answer" />
     </FormControl>
     :('')}          
     
             </CardContent>)

       })}
    </form>
      <CardMedia
        
        // image="/static/images/cards/paella.jpg"
    
      />
    
      <CardActions disableSpacing>
      <Button onClick={handleSubmit}>Submit</Button>
      </CardActions>

   
      
    </Card>
      
    )
   

}


export default function Library ({list}) {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [listIt, setListIt] = useState(list.data)
  const [newAnswers, setAnswers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])


  const handleChange2 = (event, i, quest, type) => {
    console.log('kjkjkjkjk', event.target.checked)
    let old_data = [...newAnswers]
    console.log('old data', old_data)
    let inn = 0
    if(old_data.filter(x => x.id === i).length > 0){
     let found = old_data.filter(x => x.id === i)[0].answers
     old_data.forEach((x, i) => {
      inn = i;
    })
     if(event.target.name in found){
      found[event.target.name] = false
      // old_data.splice(inn, 1, {id: i, question:quest, type: type, answers: event.target.value})
     }
     else{
      found[event.target.name] = true
     }
    }
    else{ 
      setAnswers([...old_data, {id: i, question:quest, type: type, answers: {
        [event.target.name]: event.target.checked
      }}])
    }

  };
  const handleName=(e)=>{
    setName(e.target.value)
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handleChange = (event, i, quest, type) => {

    let old_data = [...newAnswers]
    console.log('old data', old_data)
    let inn = 0
    if(old_data.filter(x => x.id === i).length > 0){
      old_data.forEach((x, i) => {
        inn = i;
      })
     let found = old_data.filter(x => x.id === i)[0].answers
     old_data.splice(inn, 1, {id: i, question:quest, type: type, answers: event.target.value})
     setAnswers(old_data)
    }
    else{ 
      old_data.push({id: i, question:quest, type: type, answers: event.target.value})
      setAnswers(old_data)
    }

  };

  const validate = () =>{
    let err = {}
    if(!email){
      err.email = 'Email required'
    }
    if(!name){
      err.name = 'Name required'
    }

    if(newAnswers.answers === undefined )
   {
      err.answers = 'Answers'
      console.log('yes', err.answers)
    }
    return err
  }


const handleSubmit= (e)=>{

e.preventDefault()
let errs = validate()
console.log("LLLL", listIt.questions.length)
if(newAnswers.length !== listIt.questions.length){
  setShowAlert(true)
}
else{
  setShowAlert(false)
}
setErrors(errs)

}



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
        <List2 handleChange={handleChange} handleChange2={handleChange2} handleName={handleName} handleEmail={handleEmail} handleSubmit={handleSubmit} title={listIt.title} comment={listIt.comment} questions={listIt.questions} email={email} name={name} errors={errors} newAnswers={newAnswers} showAlert={showAlert}/>
     
    </Layout>
  )
}


Library.getInitialProps = async({query: {id}})=>{

    const res = await axios.get(`http://localhost:3000/api/changer/${id}`)
    .catch(err=>console.log(err))
        return {list: res.data}
      // return ''
    }