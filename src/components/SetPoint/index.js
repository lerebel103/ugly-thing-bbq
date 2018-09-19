import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import formatTemperature from '../../utils/temperature.js'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import SettingsApplicationsRounded from '@material-ui/icons/SettingsApplicationsRounded'


const gridCell = {
  height: "100%",
  padding: 2,
//  backgroundColor: "#eee"
};

const temperatureStyle = {
  fontSize: "1.4em",
  padding: "5px",
};

const setPointButtonStyle = {
  backgroundColor: "gold",
  padding: 4,
  margin: 1,
};

const settingsButtonStyle = {
  padding: 0,
  margin: 0,
};

const SetPoint =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={gridCell}
      >
      <Grid container style={gridCell} xs={12}>
       <Grid xs style={{padding: 0, margin: 5}}>
         {props.title}
       </Grid>
       <Grid item alignItems="right">
          <IconButton className={classes.button} style={settingsButtonStyle} aria-label="Settings">
            <SettingsApplicationsRounded/>
          </IconButton>
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid xs style={{fontSize: "3em", padding: 0, margin: 0}}>
               {formatTemperature(243)}
          </Grid>
          <Grid container alignItems="center" justify="center" style={temperatureStyle}>
              {formatTemperature(props.temperature)}
              <IconButton className={classes.button} style={setPointButtonStyle} aria-label="Up">
                <ArrowDownward/>
              </IconButton>
              <IconButton className={classes.button} style={setPointButtonStyle} aria-label="Up">
                <ArrowUpward/>
              </IconButton>
           </Grid>
          </Grid>
      </Grid>
      </Paper>
    )
}
export default SetPoint
