import { useState, useEffect, useRef } from 'react'
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
import {useRouter} from 'next/router'
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const hostname = process.env.NEXT_PUBLIC_NEXTAUTH_URL

const List2 =({handleClick01, handleClick02, handleChange, handleChange2, handleName, handleEmail,  handleSubmit,  title, comment, questions,  errors, newAnswers, showAlert, copy})=>{


    return (
<Card style={{display: 'flex', flexDirection: 'column', justifyContent: 'flexStart', alignItems: 'flexStart', padding: '1em 1em' }}>
<style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
</style>
{copy ? <div style={{float: 'right !important', textAlign: 'right !important', display: 'flex', alignItems: 'flexEnd', width: '100%', paddingTop: 0}}>
  <Tooltip  align='right' title="Go back">
            <IconButton onClick={handleClick02}>
              <KeyboardBackspaceIcon  style={{background: 'rgb(0 0 0 / 4%)', padding: '0.1em', borderRadius: '50%'}}/>
            </IconButton>
          </Tooltip>
  <Tooltip align='right' title="Responces">
            <IconButton onClick={handleClick01}>
              <FormatListNumberedIcon  style={{background: 'rgb(0 0 0 / 4%)', padding: '0.1em', borderRadius: '50%'}}/>
            </IconButton>
          </Tooltip>
        
</div> : ('')}
      <CardHeader
      style={{color: 'rgb(63, 81, 181)', fontSize: '1.5em', fontWeight: 700, paddingTop: '0.5em'}}
        title={<Typography variant="h4" component="h5" style={{borderBottom: '0.1px solid rgb(118, 118, 118)'}}>
       {title}
      </Typography>}
      subheader={ <Typography style={{color: '#333', fontWeight: 500, background: '#f5005717', padding: '1em 0'}} variant="div" component="h6">
      {comment}
      </Typography>}
      />
     
       <form  noValidate autoComplete="off">
     {showAlert  ?<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
       <strong>Please, fill out all fields carefully!</strong>
      </Alert> :('')}
    
      {questions.map((x, index) =>{
             return( <CardContent>
      <InputLabel >
      <Typography style={{color: 'rgb(63, 81, 181)', fontWeight: 600, }} variant="div" component="h4">
      <span style={{color: 'rgb(63, 81, 181)', fontWeight: 600, }}>{index+1}.</span> {x.quest}
      </Typography>
      </InputLabel>
                  {x.type === 'one' ? 
                  
                 <RadioGroup  aria-label="gender" name="gender1"  onChange={(e) =>handleChange(e, index, x.quest, x.type)}>  
                 {x.answer.map((y, in2) => {
                
                if (y) {
                  return (
                    <Typography>
                     <FormControlLabel name={y.option} value={y.option} control={<Radio />} label={y.option} />
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
          control={<Checkbox defaultValue={false} name={y.option} onChange={(e) =>handleChange2(e, index, x.quest, x.type)}  />}
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
       <FormControl style={{padding: '0.5em 1em'}}>
       <TextField onChange={(e) =>handleChange(e, index, x.quest, x.type)} id="standard-basic" placeholder="Short answer" />
     </FormControl>
     :('')}
      {x.type === 'long' ? 
       <FormControl fullWidth style={{padding: '0.5em 0'}}>
       <TextField multiline
          rows={2} variant="outlined" fullWidth onChange={(e) =>handleChange(e, index, x.quest, x.type)} id="standard-basic" placeholder="Full answer" />
     </FormControl>
     :('')}          
     
             </CardContent>)

       })}
    </form>
      <CardMedia
        
        // image="/static/images/cards/paella.jpg"
    
      />
      <CardActions disableSpacing>
      <Button fullWidth style={{background: '#3f51b5', color: '#fff', padding: '0.3em 2em'}} onClick={handleSubmit}>Submit</Button>

      </CardActions> 
    </Card> 
      
    )
   

}


export default function Library ({list}) {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [listIt, setListIt] = useState(list.data)
  const [newAnswers, setAnswers] = useState([])
  const [copy, setCopy] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()
  const textAreaRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const [showForm, setShowForm] =useState(true)
  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      console.log('LLLL', list.data)
      setListIt(list.data)
      if (json.content) { setContent(json.content) }
      if(session){
        if(session.user.email ===  list.data.user_id){
          setCopy(true)
        }
       
      }
    }
    fetchData()
  },[session])


  const handleChange2 = (event, i, quest, type) => {

    let old_data = [...newAnswers]

    let inn = 0
    if(old_data.filter(x => x.id === i).length > 0){
     let found = old_data.filter(x => x.id === i)[0].answers
     old_data.forEach((x, i) => {
       if(x.id === i) {
      inn = i;
       }
    })
     if(event.target.name in found){
      delete found[event.target.name]


 old_data.splice(inn, 1)
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

  const handleClick01 = async()=>{
    let r_id = router.query.id
    router.push(`/library/answers/${r_id }`);
     
  }
  const handleClick02 = async()=>{
    let r_id = router.query.id
    router.push(`/library/edit/${r_id }`);
     
  }
const copyToClipboard = (e, loc) => {

    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(<div style={{color: 'rgb(63, 81, 181)', paddingTop: '0.5em'}}>Copied!</div>)
    setTimeout(() =>{
      setCopySuccess('');
    }, 1000)
  
  };
  const handleChange = (event, i, quest, type) => {
    let old_data = [...newAnswers]

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


    if(newAnswers.answers === undefined )
   {
      err.answers = 'Answers'

    }
    return err
  }


const handleSubmit= async(e)=>{
  let r_id = router.query.id

e.preventDefault()
setShowForm(false)
let index = 0;
newAnswers.forEach(y =>{
  if(y.answers){
    if(Object.keys(y.answers).length > 0) {
index++
    }
  }
})
console.log('Length', listIt.questions.length)
if(index !== listIt.questions.length){
  setShowAlert(true)
  return
}
else{
  setShowAlert(false)
let ans = [...newAnswers]
// ans.map(y =>{
//   if(y.type === "several"){
//     y.answers.
//   }
// })
   let send_obj={
     answers: newAnswers
   }
   let data = await axios.post(`${hostname}/api/answers/${r_id}`, {
    send_obj
}).catch(err=>console.log(err))

 
}
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
  //if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  //if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
console.log('CHECK list', list)
  return (
 
    <Layout style={{}}>

    {copy ?
    <div style={{marginTop: '4em' }}>
      <Typography>Copy form URL</Typography>
     
    <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}> <textarea style={{width: '100%'}}  ref={textAreaRef} value={window.location.href} />
    {
    
       document.queryCommandSupported('copy') &&
        <div >
          <button style={{width: '100%', padding: '0.65em 2em', fontWeight: 700}} onClick={(e)=>copyToClipboard(e, window.location.href)}>Copy</button> 
        
        </div>
      }
    </div>
    {copySuccess}
    {showForm ?<hr/> : ('')}
     </div> :('')}
      {showForm ? <List2 handleClick02={handleClick02} handleClick01={handleClick01} handleChange={handleChange} handleChange2={handleChange2} handleName={handleName} handleEmail={handleEmail} handleSubmit={handleSubmit} title={listIt.title} comment={listIt.comment} questions={listIt.questions}  errors={errors} newAnswers={newAnswers} showAlert={showAlert} copy={copy}/> :
     <Card style={{height:'15em'}}><Typography >
       <style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
</style>
      <center><div style={{ marginTop: 0,  padding: '0 0.5em'}}>
       
       <span style={{fontSize: '1.4em'}}>Thank you for submitting the form</span><br></br> Your response has been recorded</div></center></Typography>
       <CardMedia
      style={{width: '100%', height: '100%'}}
    image='https://cdn.shopify.com/s/files/1/2636/2774/files/logo_113a5c53-27b4-4df4-b1ad-74fb51a6b90b.png?v=1615592239'
       width='227' height='188'
      />
       </Card>}
     
    </Layout>
  )
}


Library.getInitialProps = async({query: {id}})=>{
  try{
    if(id){
    const res = await axios.get(`${hostname}/api/changer/${id}`)
    return {list: res.data}
    }
    else return {list: []}
  }catch{
    err=>{console.log(err)
    return
    }
  }
    //console.log('Props', res.data)
   
       //
      // return ''
    }