import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SetPoint from '../../components/SetPoint'
import Temperature from '../../components/Temperature'
import Fan from '../../components/Fan'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: "0px",
    color: theme.palette.text.secondary,
  },
});


function FormRow(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid item xs={4} >
        <SetPoint classes={classes}
                  title={props.title}
                  temperature={props.set_point}/>
      </Grid>
      <Grid item xs={4} >
        <Temperature classes={classes}
                     title={props.title}
                     temperature={props.temperature}/>
      </Grid>
    </React.Fragment>
  );
}

FormRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

class Home extends Component {


  constructor(props){
    super(props)
    this.state={
      pit : {
        temperature: 245,
        set_point: 350
      },
      probe1 : {
        temperature: 24.5,
        set_point: 76
      },
      probe2 : {
        temperature: 34.5,
        set_point: 98
      },
      fan : {
        rpm: 1256,
        duty_cyle: 23
      },
    }
    //this.someMethod= this.someMethod.bind(this)
  }


  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} container spacing={8}>
            <FormRow classes={this.props.classes} title="Pit"
                     temperature={this.state.pit.temperature}
                     set_point={this.state.pit.set_point}
                     />
          </Grid>
          <Grid item xs={12} container spacing={8}>
          <FormRow classes={this.props.classes} title="Probe A"
                   temperature={this.state.probe1.temperature}
                   set_point={this.state.probe1.set_point}
                   />
          </Grid>
          <Grid item xs={12} container spacing={8}>
          <FormRow classes={this.props.classes} title="Probe B"
                   temperature={this.state.probe2.temperature}
                   set_point={this.state.probe2.set_point}
                   />
          </Grid>
          <Grid item xs={12} container spacing={8}>
            <Grid item xs={8}>
              <Fan classes={this.props.classes} rpm={this.state.fan.rpm}
                                     duty_cyle={this.state.fan.duty_cyle}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
