import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cognitive_s from './cognitive_s'
import Cognitive_t from './cognitive_t';
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
      location: 0
    };
    this.handle_button_a = this.handle_button_a.bind(this)
    this.handle_button_b = this.handle_button_b.bind(this)
  }
  handle_button_a(){
    console.log(1)
    this.setState({
      location: 1
    })
  }
  handle_button_b(){
    console.log(1)
    this.setState({
      location: 2
    })
  }
  render_switch(){
    switch(this.state.location){
      case 0:
        return(this.render_home())
      case 1:
        return(<Cognitive_s/>)
      case 2:
        return(<Cognitive_t/>)
      case 3:
        return(this.render_score())
    }
  }
  render_home(){
    const { classes } = this.props;
    return(
      <main>
        <Paper className={classes.paper}>
          Home
          <Typography><a href="https://sites.google.com/site/englishprepositiontest/home/pre-training">Pre-training</a></Typography>
          <Typography><Button onClick={this.handle_button_a}>cognitive spatial preposition</Button></Typography>
          <Typography><Button onClick={this.handle_button_b}>cognitive temporal preposition</Button></Typography>
          <Typography><a href="https://goo.gl/forms/zJzk8OMzeQboV5fJ3">test (A)</a></Typography>
          <Typography><a href="https://goo.gl/forms/ce3z7uJPdRW1kb4s1">test (B)</a></Typography>
        </Paper>
      </main>
    )
  }
  render(){
    return(
      <div>{this.render_switch()}</div>
    )
  }
}
export default withStyles(styles)(App);
