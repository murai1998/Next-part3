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
import Layout from "../components/layout";
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
import SaveIcon from '@material-ui/icons/Save';

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
    return (
      <Card style={{minWidth: '100%', width: '100%', marginBottom: '1.5em', display: 'flex', flexDirection: 'column'}} key={i} variant="outlined">
         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flexStart', alignItems: 'flexStart',  padding: '1em '}}>
        <CardHeader
         style={{ width: '100%', minWidth: '100%', padding: '1em 0 1.2em', color: '#3f51b5'}}
          title={
            <TextField
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
          action={
            <Tooltip title="Delete Question">
              <IconButton onClick={(e) => deleteQuestion(e, x.id)}>
                <CancelOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
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
        {console.log("Type", x.type)}
        {(() => {
          switch (x.type) {
            case "one":
              return x.answer.map((y) => {
                console.log("array of answers", y);
                if (y) {
                  return (
                    <Typography>
                      <TextField
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
                console.log("array of answers", y);
                if (y) {
                  return (
                    <Typography>
                      <TextField
                        key={y.double_v}
                        defaultValue={y.option}
                        id="standard-search"
                        onChange={(e) => changeAnswer(e, x.id, y.double_v)}
                        type="search"
                        helperText="Option"
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
                  <Input  fullWidth disabled value='Lorem Ipsum Lorem Ipsum ' />
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





export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState(0);
  const [double_id, setDouble] = useState(1);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [showComment, setShowComment] = useState(false)
  const [open, setOpen] = useState(false);
  const [ session, loading ] = useSession()





//================SAVE FORM FUNCTIONS===============
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //========================SUBMIT==================

  const handleProceed = async()=>{
let survey = 
{ title: title,
questions: questions,
comment: comment,
}
console.log('SURVEY', survey)
let data = await axios.post(`http://localhost:3000/api/creator/${session.user.email}`, {
  survey
}).catch(err=>console.log(err))
console.log("DATTA", data)
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
      console.log(found[0]);
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
    console.log("ANFF", found);
    if (found.length > 0) {
      let found2 = [];
      found2 = found[0].answer.filter((y) => y.double_v !== double_id);

      console.log("jjjj", found2);
      found[0].answer = found2;
      all_q.splice(index, 1, found[0]);
      console.log("FFF", all_q);
      setQuestions(all_q);
    }
  };

  //==============CHANGE ANSWER==============
  const changeAnswer = (e, id, double_id) => {
    let all_q = [...questions];
    console.log(all_q);
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

      console.log("jjjj", found2);
      found[0].answer = found2;

      all_q.splice(index, 1, found[0]);
      console.log("FFF", all_q);
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
      console.log("TYpe", all_q);
      setQuestions(all_q);
    }
  };


  //============CHANGE COMMENT===============
  const addComment = (e) => {
      console.log(',,', e.target.value)
    setComment(e.target.value);
  };

  //============CHANGE TITLE=================
  const addTitle = (e) => {
    setTitle(e.target.value);
  };



  //=============AND MULTIPLE ANSWERS==============
  const addAnswer = (e, id) => {
    console.log("id ", id);
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
      console.log("Fooo", found[0]);
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
  


  



  return (
    <Layout>
      <Card style={{display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center', flexDirection: 'column', padding: '1em 2em'}} className={classes.root}>
        <div className='structure'>
        <CardHeader
        style={{minWidth: '45%', paddingTop: 0, paddingBottom: 0 }}
          title={
            <TextField
            style={{minWidth: '100%'}}
              defaultValue="Form #"
              id="standard-search"
              type="search"
              onChange={addTitle}
              helperText="Title"
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
            <IconButton>
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
          {/* <Tooltip title="Export">
            <IconButton onClick={handleClickOpen}>
              <SaveAltIcon />
            </IconButton> */}
          {/* </Tooltip> */}
        
        </CardActions>
        </div>
       
        
        <CardContent>
        {showComment ? <FormControl fullWidth>
                    <InputLabel   htmlFor="standard-adornment-amount">
                      Comment
                    </InputLabel>
                    <Input defaultValue={comment} onChange={addComment}/>
                   
              <Tooltip title="Delete Comment">
                <IconButton onClick={deleteComment}>
                  <CancelOutlinedIcon />
                </IconButton>
              </Tooltip>
            
                  </FormControl> : ('')}
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
        />
       
 
        <Question style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}} questions={questions} changeQuestion={changeQuestion} deleteQuestion={deleteQuestion} handleType={handleType} changeAnswer={changeAnswer} deleteAnswer={deleteAnswer} addAnswer={ addAnswer} classes={classes}/>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to save and publish your survey?"}</DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Cancel
          </Button>
          <Button onClick={handleProceed} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      </Card>
    </Layout>
  );
}
