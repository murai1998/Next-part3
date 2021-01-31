import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState(0);
  const [double_id, setDouble] = useState(1);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [showComment, setShowComment] = useState(false)
  const [open, setOpen] = useState(false);


//================SAVE FORM FUNCTIONS===============
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //========================SUBMIT==================

  const handleProceed =()=>{
let survey = {
    title: title,
questions: questions,
comment: comment,
}
console.log('SURVEY', survey)

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
  const Question = () => {
    return questions.map((x, i) => {
      return (
        <Card key={i} variant="outlined">
          <CardHeader
            title={
              <TextField
                fullWidth
                defaultValue={x.quest}
                id="standard-search"
                onChange={(e) => changeQuestion(e, x.id)}
                type="search"
                helperText="Question"
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
                    <Input />
                  </FormControl>
                );
              case "long":
                return (
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Response
                    </InputLabel>
                    <Input />
                  </FormControl>
                );
              default:
                return <div></div>;
            }
          })()}

          {x.type === "one" || x.type === "several" ? (
            <Button onClick={(e) => addAnswer(e, x.id)}>Add an option</Button>
          ) : (
            ""
          )}
        </Card>
      );
    });
  };



  



  return (
    <Layout>
      <Card className={classes.root}>
      <CardActions disableSpacing>
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
              <SaveAltIcon/>
            </IconButton>
          </Tooltip>
        </CardActions>
        <CardHeader
          title={
            <TextField
              defaultValue="Form #"
              id="standard-search"
              type="search"
              onChange={addTitle}
              helperText="Title"
            />
          }
        />
        
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
       
 
        <Question />
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
