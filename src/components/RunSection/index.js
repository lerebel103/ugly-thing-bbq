import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const paperStyle = {
  height: "100%",
  padding: 2,
  //backgroundColor: "#eee"
};

const cellStyle = {
  fontSize: "2.1em",
  height: "100%",
  alignItems: "center"
};


const RunSection =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={paperStyle}
      >
      <Grid xs container justify="center" style={cellStyle} >
        <Button size="large" variant="extendedFab" color="primary" aria-label="Start_Stop" className={classes.button}>
         Run
        </Button>
      </Grid>
      </Paper>
    )
}
export default RunSection
