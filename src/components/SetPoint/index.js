import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import formatTemperature from '../../utils/temperature.js'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'

const gridCell = {
  height: "100%",
  padding: 2,
  backgroundColor: "#eee"
};

const temperatureStyle = {
  fontSize: "1.5em",
  padding: "5px",
};

const setPointButtonStyle = {
  backgroundColor: "gold",
  padding: 4,
  margin: 1,
};

const SetPoint =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={gridCell}
      >
      <Grid container style={gridCell} >
        <Grid container alignItems="center" justify="center">
          <Grid item xs={4}>
             <p style={{fontSize: "3em", padding: 0, margin: 0}}>
               {formatTemperature(243)}
             </p>
             <p style={{fontSize: "1.5em", padding: 0, margin: 0}}>
               {formatTemperature(props.temperature)}
             </p>
             <p style={{padding: 0, margin: 5}}>
               {props.title}
             </p>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton className={classes.button} style={setPointButtonStyle} aria-label="Up">
                <ArrowUpward/>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.button} style={setPointButtonStyle} aria-label="Up">
                <ArrowDownward/>
              </IconButton>
            </Grid>
          </Grid>
         </Grid>
      </Grid>
      </Paper>
    )
}
export default SetPoint
