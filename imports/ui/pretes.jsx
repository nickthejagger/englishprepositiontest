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
import Soals from './pretest_test';
import Markdown from './markdown.js';
const ReactMarkdown = require('react-markdown')

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
    width: 500,
    height: 500
  },
  Media:{
    width: 300,
    height: 300
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
      isdisable: false,
      isHidden: true,
      quest: 'a',
      isCompleted: true,
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
      training: '# Pre-training\n\nGeneral instruction\n\n1. Before you learn more about prepositions in this training, we will see how much you know about other prepositions.\n\n2. There are only 5 sentences with accompanying pictures in this pre-training. You will read the 5 sentences and decide if each sentence describes the picture correctly.'
    };
  }
  componentDidMount(){
    const length = Soals.length
    this.setState({
      SumQuest : length
    })
  }

  handleNext = () =>{
    //get current quest
    if(this.state.location == 0){
      this.setState({isCompleted : false,location: 1, value_a: '', value_b: '', isHidden: true, isdisable: false, value: '', nilai:'' })
    }
    else{
      this.setState({ value_a: '', value_b: '', isHidden: true, isdisable: false, value: '', nilai:'' });
      const nextQuest = this.state.CurrentQuest + 1
      this.setState({
        isCompleted : false,
        CurrentQuest : nextQuest
      })
      if ((nextQuest + 1) > this.state.SumQuest){
        
        this.setState({ location: 2,value_a: '', value_b: '', isHidden: true, isdisable: false, value: '', nilai:'' });

      }
    }
    }
  handleChange = event => {
    const soal = Soals[this.state.CurrentQuest]
    var nilai = ''
    if(soal.choice.answer == event.target.value){
        nilai = "You're Correct"
    }
    if(soal.choice.answer != event.target.value){
        nilai = "You're Wrong"
    }
    this.setState({ value: event.target.value,nilai: nilai, isdisable: true,isHidden: false, isCompleted: true });
  };
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
                  <Typography variant="subtitle1">
                        {soal.question}
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
                      <FormControlLabel label={soal.choice.a} control={<Radio />} disabled= {this.state.isdisable} value="A" />
                      <FormControlLabel label={soal.choice.b} control={<Radio />} disabled= {this.state.isdisable} value="B" />
                    </RadioGroup>
                  </FormControl>
                  {this.state.isHidden ? <div></div> : <div className={classes.cardDetails}>
                    <Typography variant="subtitle1">
                        {this.state.nilai}
                    </Typography>
                  </div>}
                </div>
                
              </CardContent>
            </div>
          </Card>
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
        return(this.render_training())
      case 1:
        return(this.render_quiz())
      case 2:
      return(this.render_score())
    }
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