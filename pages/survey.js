import React,  { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Layout from '../components/layout'
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [questions, setQuestions] = useState([])
  const [id, setId] = useState(0)
  const [double_id, setDouble] = useState(1)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeQuestion =(e, id)=>{

let all_q = [...questions]
let index = 0;
let found = []
found = all_q.filter((x, i) =>{
if(x.id === id){
    index = i;
    return x;
}
})

if(found.length > 0){
    found[0].quest = e.target.value;
    console.log(found[0])
    all_q.splice(index, 1, found[0])
    setTimeout(()=> setQuestions(all_q), 5000)

}
  }


  const deleteQuestion =(e, id)=>{

    let all_q = [...questions]
    let found = []
    found = all_q.filter(x => x.id !== id)
    if(found.length > 0){
       setQuestions(found)
    
    }
      }


    
      const deleteAnswer = (e, id, double_id)=>{

        let all_q = [...questions]
    let index = 0;
    let found = []
    found = all_q.filter((x, i) =>{
    if(x.id === id){
        index = i;
        return x;
    }
    })
    console.log('ANFF', found)
    if(found.length > 0){

        let found2 = []
        found2 = found[0].answer.filter(y => y.double_v !== double_id)
       
    console.log('jjjj', found2)
found[0].answer = found2
        all_q.splice(index, 1, found[0])
        console.log('FFF', all_q)
setQuestions(all_q)
    
    }

      }



  const changeAnswer =(e, id, double_id)=>{
    let all_q = [...questions]
    console.log(all_q)
    let index = 0;
    let found = []
    found = all_q.filter((x, i) =>{
    if(x.id === id){
        index = i;
        return x;
    }
    })
    
    if(found.length > 0){

        let found2 = []
    let index2 = 0
        found2 = found[0].answer.map((y, i) =>{
            if(y.double_v === double_id){
                index2 = i
                y.option = e.target.value
                return y;
            }
            else{
                return y
            }
        })
       
    console.log('jjjj', found2)
found[0].answer = found2

        all_q.splice(index, 1, found[0])
        console.log('FFF', all_q)
        setTimeout(()=> setQuestions(all_q), 5000)
    
    }
      }


  const handleType=(e, id) =>{
    console.log('E', e.target.value)
    if(e.target.value === 'one'){
        
    }
  }



  const Question = ()=>{
return questions.map((x, i)=>{

return <Card key={i}  variant="outlined">
<CardHeader

title={<TextField defaultValue={x.quest}  id="standard-search" onChange={(e)=>changeQuestion(e, x.id)}  type="search" helperText="Question" />}
action={     <Tooltip title='Delete Question'>
<IconButton onClick={e => deleteQuestion(e, x.id)}>
  <CancelOutlinedIcon />
</IconButton>
</Tooltip>}
/>
<FormControl>
  <Select
    value={x.type}
    onChange={(e) =>handleType(e, x.id)}
    displayEmpty
    className={classes.selectEmpty}
    inputProps={{ 'aria-label': 'Without label' }}
  >
    <MenuItem value="" disabled>
     Select type of the response 
    </MenuItem>
    <MenuItem value='one'>Multiple choices with 1 right answer</MenuItem>
    <MenuItem value='several'>Multiple choices with several anwers</MenuItem>
    <MenuItem value='short'>Short Answer</MenuItem>
    <MenuItem value='long'>Long answer</MenuItem>
  </Select>
  {/* <FormHelperText>Select Type of Response</FormHelperText> */}
</FormControl>
{

x.answer.map(y =>{
    if(y) {
    return <Typography>< TextField key={y.double_v} defaultValue={y.option}  id="standard-search" onChange={(e)=>changeAnswer(e, x.id, y.double_v)}  type="search" helperText="Option" /> 
    <Tooltip title='Delete Answer'>
<IconButton onClick={e => deleteAnswer(e, x.id, y.double_v)}>
  <CancelOutlinedIcon />
</IconButton>
</Tooltip>
    </Typography>
    }
    else{
        return ''
    }
})
    
}
<Button onClick={(e)=>addAnswer(e, x.id)}>Add another option</Button>
</Card>

})
  }

  const addAnswer =(e, id)=>{
    let all_q = [...questions];
    let index = 0;
    let found = []
    found = all_q.filter((x, i) =>{
    if(x.id === id){
        index = i;
        return x;
    }
    })
    if(found.length > 0){
        found[0].answer.push({
            double_v: double_id,
            option: ''
        })
        all_q.splice(index, 1, found[0])
    }
    let new_id = double_id;
    setDouble(new_id + 1)
}



  const addQuestion =()=>{
      let all_q = [...questions];
      let new_obj = {
          id: id,
          quest: '',
          type: '',
          answer: []
      }
      let new_id = id;
      setId(new_id + 1)
      all_q.push(new_obj)
      setQuestions(all_q)
  }

  return (
      <Layout>
    <Card className={classes.root}>
      <CardHeader
        title=   {<TextField defaultValue="Form #" id="standard-search"  type="search"         helperText="Title" />}
      />

      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
      />
       <CardActions disableSpacing>
       <Tooltip title='Add Question'>
        <IconButton onClick={addQuestion}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title='Delete Form'>
        <IconButton>
          <DeleteOutlineOutlinedIcon/>
        </IconButton>
        </Tooltip>
        <Tooltip title='Add comment'>
        <IconButton>
          <SpeakerNotesOutlinedIcon/>
        </IconButton>
        </Tooltip>
       

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

     <Question/>


      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
     
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Layout>
  );
}
