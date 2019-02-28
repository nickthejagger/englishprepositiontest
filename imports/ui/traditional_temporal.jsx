import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
const moment = require('moment');
import { Meteor } from "meteor/meteor";
import Soals from './traditional_t';
import Markdown from './markdown.js';
import ReactMarkdown from 'react-markdown'
const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2,
  },
  column: {
    flexBasis: '33.33%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing.unit * 5,
  },
  card: {
    display: 'flex',
    padding: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
  },
  card_a: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 320,
    "background-size": "contain"
 
  },
  Media:{
    width: 320,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  quest2: {
    'padding-left': theme.spacing.unit * 1,
    'padding-right': theme.spacing.unit * 1,
    minWidth: 60,
    maxWidth: 300,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  login_main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  login_paper:{
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNexthiding: true,
      isdisable: true,
      isHidden: true,
      quest: 'a',
      isCompleted: false,
      SumQuest: 0,
      CurrentQuest: 0,
      Score: 0,
      value: '',
      value_a: '',
      value_b:'',
      nilai: '',
      username: '',
      useremail: '',
      userphone: '',
      userdate: '',
      location: 0,
      location_intro: 1,
      training: 'abc'
    };
    this.handleNext = this.handleNext.bind(this)
    this.handleStart = this.handleStart.bind(this)
  }
  componentDidMount(){
    const length = Soals.length
    this.setState({
      SumQuest : length
    })
  }
  handleNext = () =>{
    //get current quest
    if(this.state.location == 2){
      this.setState({ value_a: '', value_b: '', isHidden: true, isdisable: true, value: '', nilai:'' });
      const nextQuest = this.state.CurrentQuest + 1
      this.setState({
        isCompleted : false,
        CurrentQuest : nextQuest
      })
      if ((nextQuest + 1) > this.state.SumQuest){
        this.setState({ value_a: '', value_b: '', isHidden: true, isdisable: true, value: '', nilai:'', isCompleted: false, location: 3 });
      }
    } else if(this.state.location == 1) {
      if(this.state.location_intro == 2){
        this.setState({ value_a: '', value_b: '', isHidden: true, isdisable: true, value: '', nilai:'', isCompleted: false, location: 2 });
      } else {
        const next = this.state.location_intro + 1
        this.setState({
          location_intro: next
        })
        console.log(this.state.location_intro + '.md')
        Meteor.call("Get_training","TT", next +'.md',(err,res)=>{
          this.setState({
            training: res
          })
        })
      }
    }
    
  }
  handleChange = event => {
    const soal = Soals[this.state.CurrentQuest]
    this.setState({ value: event.target.value, isdisable: true,isHidden: false, isCompleted: true });
  };
  handleStart= () => {
    console.log(this.state.location_intro+ '.md')
    Meteor.call("Get_training","TT", this.state.location_intro +'.md',(err,res)=>{
      this.setState({
        training: res,
        location: 1,
        userdate: moment().format('MMMM Do YYYY, h:mm:ss a'),
        isCompleted: true
      })
    })
  }
  handleIntro = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  render_intro(){
    const { classes } = this.props;
    //get date using momentjs
    return(
      <div className={classes.login_main}>
        <div className={classes.login_paper}>
          <Typography component="h1" variant="h5">
            Please type your email to start
          </Typography>
          <form className={classes.form}>
            <FormControl controlid='usermail' margin="normal" value={this.state.useremail} required fullWidth onChange={this.handleIntro}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="useremail" name="useremail" autoFocus />
            </FormControl>
            <FormControl controlid='userphone' margin="normal" value={this.state.userphone}required fullWidth onChange={this.handleIntro}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
              <Input id="userphone" name="userphone" autoFocus />
            </FormControl>
            <FormControl controlid='username' margin="normal" value={this.state.username} required fullWidth onChange={this.handleIntro}>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input id="username" name="username" autoFocus />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleStart} 
            >
              Start
            </Button>
          </form>
        </div>
      </div>
    )
  }
  render_quiz(){
    const { classes } = this.props;
    const soal = Soals[this.state.CurrentQuest]
    return(
      <div>
        <div>
          <Card className={classes.card}>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={soal.image}
                title="Image title"
              />
            </Hidden>
            <div className={classes.cardDetails}>
              <CardContent>
                <div>
                  <Typography variant="subtitle1" color="primary">
                  1. Carefully read the info that will appear after your selection
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                  2. Then, decide which of the following sentences best describes the picture.
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                  3. Carefully, read and learn the feedback that will appear after your selection
                  </Typography>
                </div>
                <div>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender1"
                      className={classes.group}
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel label={soal.option_1.string} control={<Radio />} value="A" />
                      <FormControlLabel label={soal.option_2.string} control={<Radio />} value="B" />
                    </RadioGroup>
                  </FormControl>
                  {this.state.isHidden ? <div></div> : <div className={classes.cardDetails}>
                    <Typography variant="subtitle1">
                        {soal.option_1.desc}
                    </Typography>
                  </div>}
                </div>
                
              </CardContent>
            </div>
          </Card>
          <Card className={classes.card_a}>
            <CardContent>
              <div >
                    <Typography variant="h6" gutterBottom>{soal.instruction.exp_a}</Typography>
                    <Typography variant="subtitle1" gutterBottom>1.   {soal.instruction.a_1}</Typography>
                    <Typography variant="subtitle1" gutterBottom>2.   {soal.instruction.a_2}</Typography>
                    <Typography variant="subtitle1" gutterBottom>3.   {soal.instruction.a_3}</Typography>
                    <Typography variant="h6" gutterBottom>{soal.instruction.exp_b}</Typography>
                    <Typography variant="subtitle1" gutterBottom>1.   {soal.instruction.b_1}</Typography>
                    <Typography variant="subtitle1" gutterBottom>2.   {soal.instruction.b_2}</Typography>
                    <Typography variant="subtitle1" gutterBottom>3.   {soal.instruction.b_3}</Typography>
              </div>
              
            </CardContent>
          </Card>
          
          </div>
      </div>
    )
  }
  render_score(){
    const { classes } = this.props;
    //get date using momentjs
    return(
      <div className={classes.login_main}>
        <div className={classes.login_paper}>
          <Typography component="h1" variant="h5">
            Congratulation, you finish the test!
          </Typography>
        </div>
      </div>
    )
  }
  render_training(){
    const { classes } = this.props;
    return(
      <div>
        <ReactMarkdown source={this.state.training}></ReactMarkdown>
      </div>
    )
  }
  render_swith(){
    switch(this.state.location){
      case 0:
        return(this.render_intro())
      case 1:
        return(this.render_training())
      case 2:
        return(this.render_quiz())
      case 3:
        return(this.render_score())
    }
  }
  render(){
    const { classes } = this.props;
    return(
      <main>
        <Paper className={classes.paper}>
          <div className={classes.buttons}>
            <Button variant="outlined" size="large" color="primary" className={classes.button} disabled={!this.state.isCompleted} onClick={this.handleNext}>
              Next
            </Button>
          </div>
          {this.render_swith()}
          </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(App);
