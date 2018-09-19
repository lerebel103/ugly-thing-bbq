import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SettingsApplicationsRounded from '@material-ui/icons/SettingsApplicationsRounded'

const gridCell = {
  height: "100%",
  padding: 2,
//  backgroundColor: "#eee"
};
const settingsButtonStyle = {
  padding: 0,
  margin: 0,
};



const Fan =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={gridCell}
      >
      <Grid container xs={12}>
       <Grid xs style={{padding: 0, margin: 5}}>
         Fan
       </Grid>
       <Grid item alignItems="right">
          <IconButton className={classes.button} style={settingsButtonStyle} aria-label="Settings">
            <SettingsApplicationsRounded/>
          </IconButton>
        </Grid>
        <Grid container alignItems="center" justify="center" >
          <Grid item style={{fontSize: "1.4em", padding: 0, margin: 0}}>
             <Grid>
             {props.rpm} RPM
             <Grid>
             </Grid>
             {props.duty_cyle}%
             </Grid>
          </Grid>
       </Grid>
       </Grid>
      </Paper>
    )
}
export default Fan
