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

import { Meteor } from "meteor/meteor";
import Soals from './soal';

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
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isdisable: true,
      isHidden: true,
      quest: 'a',
      isCompleted: false,
      SumQuest: 0,
      CurrentQuest: 0,
      Score: null,
      value: '',
      value_a: '',
      value_b:'',
      nilai: ''
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
    this.setState({ value_a: '', value_b: '', isHidden: true, isdisable: true, value: '', nilai:'' });
    const nextQuest = this.state.CurrentQuest + 1
    console.log(nextQuest)
    this.setState({
      isCompleted : false,
      CurrentQuest : nextQuest
    })
    if ((nextQuest + 1) >= this.state.SumQuest){
      //showing popup you're completed + your score
    }
  }
  handleComplete(score){
    this.setState({
      isCompleted: true,
      Score: score
    })
  }
  handleChange = event => {
    this.setState({ value: event.target.value, isdisable: true, isCompleted: true });
    const answer = event.target.value
    //is it correct?
    if(answer == Soals[this.state.CurrentQuest].quest_1.answer){
      this.setState({
        nilai: 'Correct'
      })
      console.log("benar!")
    }
    else {
      console.log("salah!")
      this.setState({
        nilai: 'Wrong!'
      })
    }

  };
  handleChange_a = event => {
    if(Soals[this.state.CurrentQuest].quest_2.answer == 'A')
    {
      const answer_1 = "A"
      const answer_2 = 'B'
      this.setState({ value_a: answer_1, value_b: answer_2, isHidden: false, isdisable: false });
    } else {
      const answer_1 = "B"
      const answer_2 = 'A'
      this.setState({ value_a: answer_1, value_b: answer_2, isHidden: false, isdisable: false });
    }
    
  }
  handleChange_b = event => {
    if(Soals[this.state.CurrentQuest].quest_2.answer == 'A')
    {
      const answer_1 = "A"
      const answer_2 = 'B'
      this.setState({ value_a: answer_1, value_b: answer_2, isHidden: false, isdisable: false });
    } else {
      const answer_1 = "B"
      const answer_2 = 'A'
      this.setState({ value_a: answer_1, value_b: answer_2, isHidden: false, isdisable: false });
    }
  }
  render(){
    const { classes } = this.props;
    const soal = Soals[this.state.CurrentQuest]
    return(
      <main>
        <Paper className={classes.paper}>
          <div className={classes.buttons}>
            <Button variant="outlined" size="large" color="primary" className={classes.button} disabled={!this.state.isCompleted} onClick={this.handleNext}>
              Next
            </Button>
          </div>
          <div>
          <Card className={classes.card}>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={soal.image.first_image}
                title="Image title"
              />
            </Hidden>
            <div className={classes.cardDetails}>
              <CardContent>
                <div>
                  <Typography variant="subtitle1" color="primary">
                  1. Choose the trajector and the landmark below
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                  2. Carefully read the info that will appear after your selection
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                  3. Then, decide which of the following sentences best describes the picture.
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                  4. Carefully, read and learn the feedback that will appear after your selection
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
                      <FormControlLabel label={soal.quest_1.A} disabled= {this.state.isdisable} control={<Radio />} value="A" />
                      <FormControlLabel label={soal.quest_1.B} disabled= {this.state.isdisable} control={<Radio />} value="B" />
                    </RadioGroup>
                  </FormControl>
                  <Typography variant="subtitle1" color="primary">
                  {this.state.nilai}
                  </Typography>
                  
                </div>
                <div >
                  <Typography variant="subtitle1" color="primary">
                    in this sentence, the trajector is     
                    <FormControl className={classes.quest2}>
                      <Select
                        value={this.state.value_a}
                        onChange={this.handleChange_a}
                        displayEmpty
                        name="A"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"A"}>{soal.quest_2.dropdown.A}</MenuItem>
                        <MenuItem value={"B"}>{soal.quest_2.dropdown.B}</MenuItem>
                      </Select>
                    </FormControl>
                    , and the landmark is    
                    <FormControl className={classes.quest2}>
                    <Select
                      value={this.state.value_b}
                      onChange={this.handleChange_b}
                      displayEmpty
                      name="B"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"A"}>Books</MenuItem>
                      <MenuItem value={"B"}>Box</MenuItem>
                    </Select>
                  </FormControl>
                  </Typography>
                </div>
              </CardContent>
            </div>
          </Card>
          {this.state.isHidden ? <div></div> : <Card className={classes.card_a}>
            <CardContent>
              <div className={classes.cardDetails}>
                  <Typography variant="subtitle1">
                    {soal.notes.first.txt}
                  </Typography>
              </div>
              <Grid container spacing={40} 
                justify="center"
                alignItems="center">
                <Grid item key={'a'} xs={12} sm={12} md={4}>
                  <Card>
                    <CardMedia
                      className={classes.Media}
                      image={soal.image.second_image}
                    />
                    <CardContent>
                      <Typography component="p">
                      {soal.notes.first.img_explanation[0].explanation}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item key={'b'} xs={12} sm={12} md={4}>
                  <Card>
                    <CardMedia
                      className={classes.Media}
                      image={soal.image.third_image}
                    />
                    <CardContent>
                      <Typography component="p">
                      {soal.notes.first.img_explanation[1].explanation}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>}
          </div>
        </Paper>
      </main>
    )
  }
}
export default withStyles(styles)(App);
