import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Layout from "../../../components/layout.js";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Input from "@material-ui/core/Input";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { useSession, getSession } from 'next-auth/client'
import AccessDenied from '../../../components/access-denied'
import {useRouter} from 'next/router'
import SaveIcon from '@material-ui/icons/Save';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { Alert, AlertTitle } from '@material-ui/lab';
const hostname = process.env.NEXT_PUBLIC_NEXTAUTH_URL


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));


const Question = ({ questions, changeQuestion, deleteQuestion, handleType, changeAnswer, deleteAnswer, addAnswer, classes }) => {
  return questions.map((x, i) => {
    console.log('All', x)
    return (
      <Card style={{minWidth: '100%', width: '100%', marginBottom: '1.5em', display: 'flex', flexDirection: 'column', border: '1px solid rgb(63, 81, 181)'}} key={i} variant="outlined">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flexStart', alignItems: 'flexStart',  padding: '1em '}}>
        <CardHeader
         style={{ width: '100%', minWidth: '100%', padding: '1em 0 1.2em', color: '#3f51b5'}}
          title={
            <TextField
            multiline
              fullWidth
              defaultValue={x.quest}
              id="standard-search"
              onChange={(e) => changeQuestion(e, x.id)}
              type="search"
              helperText="Question"
              size="large"
              style={{ fontWeight: 700, color: '#3f51b5'}}
            />
          }
          // action={
          //   <Tooltip title="Delete Question">
          //     <IconButton onClick={(e) => deleteQuestion(e, x.id)}>
          //       <CancelOutlinedIcon />
          //     </IconButton>
          //   </Tooltip>
          // }
        />
        <FormControl>
          <Select
            value={x.type}
            onChange={(e) => handleType(e, x.id)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Select type of the response
            </MenuItem>
            <MenuItem value="one">
              Multiple choices with 1 right answer
            </MenuItem>
            <MenuItem value="several">
              Multiple choices with several anwers
            </MenuItem>
            <MenuItem value="short">Short Answer</MenuItem>
            <MenuItem value="long">Long answer</MenuItem>
          </Select>
          {/* <FormHelperText>Select Type of Response</FormHelperText> */}
        </FormControl>

        {(() => {
          switch (x.type) {
            case "one":
              return x.answer.map((y) => {
              
                if (y) {
                  return (
                    <Typography>
                      <TextField
                      multiline
                        key={y.double_v}
                        defaultValue={y.option}
                        id="standard-search"
                        onChange={(e) => changeAnswer(e, x.id, y.double_v)}
                        type="search"
                        helperText="Option"
                      />
                      <Tooltip title="Delete Answer">
                        <IconButton
                          onClick={(e) => deleteAnswer(e, x.id, y.double_v)}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  );
                } else {
                  return "";
                }
              });

            case "several":
              return x.answer.map((y) => {
 
                if (y) {
                  return (
                    <Typography>
                      <TextField
                      multiline
                        key={y.double_v}
                        defaultValue={y.option}
                        id="standard-search"
                        onChange={(e) => changeAnswer(e, x.id, y.double_v)}
                        type="search"
                        helperText="Option"
                      />
                      <Tooltip title="Delete Answer">
                        <IconButton
                          onClick={(e) => deleteAnswer(e, x.id, y.double_v)}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  );
                } else {
                  return "";
                }
              });

            case "short":
              return (
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Response
                  </InputLabel>
                  <Input disabled value='Ex: YES or No' />
                </FormControl>
              );
            case "long":
              return (
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Response
                  </InputLabel>
                  <Input multiline  fullWidth disabled value='Lorem Ipsum Lorem Ipsum ' />
                </FormControl>
              );
            default:
              return <div></div>;
          }
        })()}

        {x.type === "one" || x.type === "several" ? (
          <Button style={{background: '#3f51b5', color: '#fff'}}  onClick={(e) => addAnswer(e, x.id)}>Add an option</Button>
        ) : (
          ""
        )}
        </div>
        <div style={{borderTop: '2px dotted rgb(63, 81, 181)', display: 'flex', justifyContent: 'center', width: '100%', minWidth: '100%'}}>
          <Tooltip style={{width: '100%'}}  title="Delete Question">
              <IconButton onClick={(e) => deleteQuestion(e, x.id)}>
                <CancelOutlinedIcon style={{color: '#3f51b5'}}/>
              </IconButton>
            </Tooltip>
            </div>
      </Card>
    );
  });
};





export default function Edit({memory}) {
  const classes = useStyles();
  const [questions, setQuestions] = useState(memory.data.questions);
  const [id, setId] = useState(0);
  const [double_id, setDouble] = useState(memory.data.questions.length + 1);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState(memory.data.title);
  const [showComment, setShowComment] = useState(false)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [this_id, setThisId] = useState(memory.data._id);
  const router = useRouter()
const [old_data, setOldData]  = useState(memory.data)
const [showAlert, setShowAlert] = useState(false)
const [showAlert2, setShowAlert2] = useState(false)
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
      let new_index = 0
      memory.data.questions.forEach(x =>{
       if( new_index < x.id) new_index = x.id
      })
      console.log("New Index", memory.data)
      setComment(memory.data.comment)
      setId(new_index + 1) 
    }
    fetchData()
  },[session])


//================SAVE FORM FUNCTIONS===============
  const handleClickOpen = async() => {
    let t_type = 0;
    let answ = 0
    questions.map(q => {
      if(q.type === "") t_type++
      if((q.type === "several" && q.answer.length === 0) || (q.type === "one" && q.answer.length === 0)){
        answ++
      }
    })
    if(t_type > 0){
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
    else if(answ > 0){
      setShowAlert2(true)
      setTimeout(() => {
        setShowAlert2(false);
      }, 4000);
    }
    else{
      setOpen(true);
    }
   
  };
  const handleClickOpen2 = async() => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  //========================SUBMIT==================

  const handleProceed = async()=>{
let survey = {
    title: title,
questions: questions,
comment: comment,
}

let r_id = router.query.id
console.log("Survey122222222", survey)
let data3 = await axios.delete(`${hostname}/${r_id}`).catch(err=>console.log(err))
let data = await axios.put(`${hostname}/api/changer/${r_id}`, {
  survey
}).catch(err=>console.log(err))
console.log("Post", data3)
router.push(`/library/${session.user.email}`);
    setOpen(false);
  }


  const handleClick = async()=>{

    let survey = {
    title: title,
    questions: questions,
    comment: comment,
    }
    console.log("Export", survey)
    let r_id = router.query.id
    console.log("Survey", survey)
    let data = await axios.put(`${hostname}/api/changer/${r_id}`, {
      survey
    }).catch(err=>console.log(err))
    console.log("KKK2", memory.data._id)
    router.push(`/library/export/${memory.data._id}`);
        setOpen(false);

  }
  
  const handleClick01 = async()=>{
    let survey = {
    title: title,
    questions: questions,
    comment: comment,
    }
    let r_id = router.query.id
    console.log("Survey", survey)
    let data = await axios.put(`${hostname}/api/changer/${r_id}`, {
      survey
    }).catch(err=>console.log(err))
    console.log("KKK", memory.data._id)
    router.push(`/library/answers/${memory.data._id}`);
        setOpen(false);

  }


  //===========CHANGE QUESTION=============
  const changeQuestion = (e, id) => {
    let all_q = [...questions];
    let index = 0;
    let found = [];
    found = all_q.filter((x, i) => {
      if (x.id === id) {
        index = i;
        return x;
      }
    });

    if (found.length > 0) {
      found[0].quest = e.target.value;
      all_q.splice(index, 1, found[0]);
      setTimeout(() => setQuestions(all_q), 5000);
    }
  };

   //===========DELETE QUESTION=============
  const deleteQuestion = (e, id) => {
    let all_q = [...questions];
    let found = [];
    found = all_q.filter((x) => x.id !== id);
    if (found.length > 0) {
      setQuestions(found);
    }
  };

  //===========DELETE ANSWER=============
  const deleteAnswer = (e, id, double_id) => {
    let all_q = [...questions];
    let index = 0;
    let found = [];
    found = all_q.filter((x, i) => {
      if (x.id === id) {
        index = i;
        return x;
      }
    });
 
    if (found.length > 0) {
      let found2 = [];
      found2 = found[0].answer.filter((y) => y.double_v !== double_id);

  
      found[0].answer = found2;
      all_q.splice(index, 1, found[0]);

      setQuestions(all_q);
    }
  };

  //==============CHANGE ANSWER==============
  const changeAnswer = (e, id, double_id) => {
    let all_q = [...questions];

    let index = 0;
    let found = [];
    found = all_q.filter((x, i) => {
      if (x.id === id) {
        index = i;
        return x;
      }
    });

    if (found.length > 0) {
      let found2 = [];
      let index2 = 0;
      found2 = found[0].answer.map((y, i) => {
        if (y.double_v === double_id) {
          index2 = i;
          y.option = e.target.value;
          return y;
        } else {
          return y;
        }
      });


      found[0].answer = found2;

      all_q.splice(index, 1, found[0]);

      setTimeout(() => setQuestions(all_q), 5000);
    }
  };


  //============CHANGE TYPE OF ANSWER===============
  const handleType = (e, id) => {
    let all_q = [...questions];
    let index = 0;
    let found = [];
    found = all_q.filter((x, i) => {
      if (x.id === id) {
        index = i;
        return x;
      }
    });

    if (found.length > 0) {
      found[0].type = e.target.value;
      found[0].answer = [];
      all_q.splice(index, 1, found[0]);

      setQuestions(all_q);
    }
  };
//===================DELETE FORM ===============

const deleteForm= async(e, id)=>{
let deleteF = await axios.delete(`http://localhost:3000/api/changer/${id}`).catch(err=>console.log(err))
console.log('DELETE', deleteF)
router.push(`/library/${session.user.email}`);
}



  //============CHANGE COMMENT===============
  const addComment = (e) => {

    setComment(e.target.value);
  };

  //============CHANGE TITLE=================
  const addTitle = (e) => {
    setTitle(e.target.value);
  };



  //=============AND MULTIPLE ANSWERS==============
  const addAnswer = (e, id) => {

    let all_q = [...questions];
    let index = 0;
    let found = [];

    found = all_q.filter((x, i) => {
      if (x.id === id) {
        index = i;
        return x;
      }
    });
    if (found.length > 0) {

      found[0].answer.push({
        double_v: double_id,
        option: "",
      });
      all_q.splice(index, 1, found[0]);
    }
    let new_id = double_id;
    setDouble(new_id + 1);
  };



  //=================ADD QUESTION============


  const addQuestion = () => {
    let all_q = [...questions];
    let new_obj = {
      id: id,
      quest: "",
      type: "",
      answer: [],
    };
    let new_id = id;
    setId(new_id + 1);
    all_q.push(new_obj);
    setQuestions(all_q);
  };


  //==================DELETE COMMENT================

  const deleteComment =()=>{
      setShowComment(false);
      setComment('')
  }

  //=================SHOW QUESTION=================

  const toggleComment =()=>{
let state_now = showComment;
setShowComment(!state_now)
  }

  //=======================QUESTION CARD===============
  


  

  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <AccessDenied/>}

  return (
    <Layout >
      {console.log("MEMORY", memory)}
      <Card style={{display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center', flexDirection: 'column', padding: '1em 2em'}}>
      <div className='structure' style={{marginBottom: '2em'}}>
      <CardHeader
      style={{minWidth: '45%', paddingTop: 0, paddingBottom: 0 }}
          title={
            <TextField
            multiline
            style={{minWidth: '100%'}}
              defaultValue={old_data.title}
              id="standard-search"
              type="search"
              onChange={addTitle}
              helperText="Title"
              size="large"
              style={{color: '#3f51b5'}}
              
            />
          }
        />
      <CardActions style={{width: 'fitContent'}} disableSpacing>
          <Tooltip title="Add Question">
            <IconButton onClick={addQuestion}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Form">
            <IconButton onClick={handleClickOpen2}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add comment">
            <IconButton onClick={toggleComment}>
              <SpeakerNotesOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Form">
            <IconButton onClick={handleClickOpen}>
              <SaveIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton onClick={handleClick}>
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Responces">
            <IconButton onClick={handleClick01}>
              <FormatListNumberedIcon  />
            </IconButton>
          </Tooltip>
          
        </CardActions>
        </div>

       {showAlert  ?<Alert severity="error" style={{ width: '100%', marginBottom: '1em'}}>
        <AlertTitle>Error</AlertTitle>
       <strong>Choose a type of answer, it can't be a blank!</strong>
      </Alert> :('')}
      {showAlert2  ?<Alert severity="error" style={{ width: '100%', marginBottom: '1em'}} severity="error">
        <AlertTitle>Error</AlertTitle>
       <strong>Add options for a muliple choices question, it can't be a blank</strong>
      </Alert> :('')}
        {showComment ?<div style={{ width: '100%',  border: '1px solid rgb(63, 81, 181)', }}>   <FormControl style={{display: 'flex', flexDirection: 'row', width: '100%', minWidth: '100%', margin: 0, padding: 0, justifyContent: 'flexStart', alignItems: 'flexStart', float: 'left !important'}}  fullWidth>
        
                 
                    <TextField
  
          id="outlined-multiline-static"
         
          multiline defaultValue={old_data.comment} onChange={addComment}
          variant="outlined"
          label="Comment"
          fullWidth
        />
                   
                 
              <Tooltip  title="Delete Comment">
                <IconButton  onClick={deleteComment}>
                  <CancelOutlinedIcon  style={{color: '#3f51b5'}}/>
                </IconButton>
              </Tooltip>
            
                  </FormControl>  </div>:('')}
       
 
        <Question style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}  questions={questions} changeQuestion={changeQuestion} deleteQuestion={deleteQuestion} handleType={handleType} changeAnswer={changeAnswer} deleteAnswer={deleteAnswer} addAnswer={ addAnswer} classes={classes}/>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to update this form? Make sure that all existing answers will be removed"}</DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Cancel
          </Button>
          <Button onClick={handleProceed} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to delete this form?"}</DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
           Cancel
          </Button>
          <Button onClick={(e)=>deleteForm(e, this_id)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Card>
    </Layout>
  );
}



Edit.getInitialProps = async({query: {id}})=>{
  const res = await axios.get(`http://localhost:3000/api/changer/${id}`)
  .catch(err=>console.log(err))
      return {memory: res.data}
    // return ''
  }